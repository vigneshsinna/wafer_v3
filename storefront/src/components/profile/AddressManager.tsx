"use client";

import { useEffect, useState } from "react";
import { deleteAddress, getAddresses, getCities, getCountries, getStates, saveAddress } from "@/lib/api";
import type { Address, AddressInput, LocationOption } from "@/types";

const emptyAddress: AddressInput = {
    address: "", country_id: 0, state_id: 0, city_id: 0, postal_code: "", phone: "",
};

export default function AddressManager() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [countries, setCountries] = useState<LocationOption[]>([]);
    const [states, setStates] = useState<LocationOption[]>([]);
    const [cities, setCities] = useState<LocationOption[]>([]);
    const [form, setForm] = useState<AddressInput>(emptyAddress);
    const [editingId, setEditingId] = useState<number>();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        void Promise.all([getAddresses(), getCountries()])
            .then(([saved, available]) => { setAddresses(saved); setCountries(available); })
            .catch(e => setError(e instanceof Error ? e.message : "Could not load addresses."));
    }, []);

    useEffect(() => {
        if (!form.country_id) { setStates([]); return; }
        let current = true;
        void getStates(form.country_id).then(data => { if (current) setStates(data); })
            .catch(e => { if (current) setError(e instanceof Error ? e.message : "Could not load states."); });
        return () => { current = false; };
    }, [form.country_id]);

    useEffect(() => {
        if (!form.state_id) { setCities([]); return; }
        let current = true;
        void getCities(form.state_id).then(data => { if (current) setCities(data); })
            .catch(e => { if (current) setError(e instanceof Error ? e.message : "Could not load cities."); });
        return () => { current = false; };
    }, [form.state_id]);

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setBusy(true);
        setError("");
        try {
            await saveAddress(form, editingId);
            setAddresses(await getAddresses());
            setForm(emptyAddress);
            setEditingId(undefined);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Could not save address.");
        } finally {
            setBusy(false);
        }
    }

    async function remove(id: number) {
        if (!window.confirm("Delete this address?")) return;
        setBusy(true);
        setError("");
        try {
            await deleteAddress(id);
            setAddresses(current => current.filter(address => address.id !== id));
            if (editingId === id) { setEditingId(undefined); setForm(emptyAddress); }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Could not delete address.");
        } finally {
            setBusy(false);
        }
    }

    return <section className="bg-white rounded-xl p-6 shadow-sm" aria-labelledby="addresses-title">
        <h2 id="addresses-title" className="text-lg font-bold text-primary mb-4">Shipping addresses</h2>
        {error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
        <div className="space-y-3 mb-6">
            {addresses.length === 0 && <p className="text-primary/70">No saved addresses.</p>}
            {addresses.map(saved => <div key={saved.id} className="border rounded-lg p-4">
                <p>{saved.address}, {saved.city}, {saved.state}, {saved.country} {saved.postal_code}</p>
                <p className="text-sm text-primary/70">{saved.phone}</p>
                <div className="flex gap-4 mt-2">
                    <button type="button" className="text-primary underline" onClick={() => {
                        setEditingId(saved.id);
                        setForm({ address: saved.address, country_id: saved.country_id, state_id: saved.state_id,
                            city_id: saved.city_id, postal_code: saved.postal_code, phone: saved.phone });
                    }}>Edit</button>
                    <button type="button" disabled={busy} className="text-red-700 underline disabled:opacity-50"
                        onClick={() => void remove(saved.id)}>Delete</button>
                </div>
            </div>)}
        </div>
        <form onSubmit={submit} className="space-y-4">
            <h3 className="font-semibold">{editingId ? "Edit address" : "Add address"}</h3>
            <label className="block">Street address
                <textarea required maxLength={1000} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                    className="block w-full border rounded-lg p-2 mt-1" />
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
                <label className="block">Country
                    <select required value={form.country_id || ""} onChange={e => setForm({ ...form, country_id: Number(e.target.value), state_id: 0, city_id: 0 })}
                        className="block w-full border rounded-lg p-2 mt-1">
                        <option value="">Select country</option>
                        {countries.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                    </select>
                </label>
                <label className="block">State
                    <select required value={form.state_id || ""} onChange={e => setForm({ ...form, state_id: Number(e.target.value), city_id: 0 })}
                        className="block w-full border rounded-lg p-2 mt-1">
                        <option value="">Select state</option>
                        {states.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                    </select>
                </label>
                <label className="block">City
                    <select required value={form.city_id || ""} onChange={e => setForm({ ...form, city_id: Number(e.target.value) })}
                        className="block w-full border rounded-lg p-2 mt-1">
                        <option value="">Select city</option>
                        {cities.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                    </select>
                </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                <label className="block">Postal code
                    <input required maxLength={20} value={form.postal_code} onChange={e => setForm({ ...form, postal_code: e.target.value })}
                        className="block w-full border rounded-lg p-2 mt-1" />
                </label>
                <label className="block">Phone
                    <input required type="tel" maxLength={30} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="block w-full border rounded-lg p-2 mt-1" />
                </label>
            </div>
            <div className="flex gap-3">
                <button disabled={busy} className="px-5 py-2 bg-primary text-white rounded-lg disabled:opacity-50">{busy ? "Saving…" : "Save address"}</button>
                {editingId && <button type="button" onClick={() => { setEditingId(undefined); setForm(emptyAddress); }} className="underline">Cancel</button>}
            </div>
        </form>
    </section>;
}
