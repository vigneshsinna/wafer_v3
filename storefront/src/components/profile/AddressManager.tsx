"use client";

import { useEffect, useState } from "react";
import { deleteAddress, getAddresses, getCities, getCountries, getStates, saveAddress } from "@/lib/api";
import type { Address, AddressInput, LocationOption } from "@/types";

const emptyAddress: AddressInput = {
    recipient_name: "", address: "", country_id: 0, state_id: 0, city_id: 0, postal_code: "", phone: "",
};

export default function AddressManager({ onChange, selectedId, onSelect, onEditingChange, embedded = false }: {
    onChange?: (addresses: Address[]) => void;
    selectedId?: number;
    onSelect?: (id: number) => void;
    onEditingChange?: (editing: boolean) => void;
    embedded?: boolean;
}) {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [countries, setCountries] = useState<LocationOption[]>([]);
    const [states, setStates] = useState<LocationOption[]>([]);
    const [cities, setCities] = useState<LocationOption[]>([]);
    const [form, setForm] = useState<AddressInput>(emptyAddress);
    const [editingId, setEditingId] = useState<number>();
    const [formOpen, setFormOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        void getAddresses()
            .then(saved => {
                setAddresses(saved);
                onChange?.(saved);
            })
            .catch(e => setError(e instanceof Error ? e.message : "Could not load addresses."));
    }, []);

    useEffect(() => {
        if (!formOpen || countries.length) return;
        let current = true;
        void getCountries().then(available => {
            if (!current) return;
            setCountries(available);
            if (embedded) {
                const india = available.find(option => option.name === "India");
                if (india) setForm(form => form.country_id ? form : { ...form, country_id: india.id });
            }
        }).catch(e => { if (current) setError(e instanceof Error ? e.message : "Could not load countries."); });
        return () => { current = false; };
    }, [formOpen, countries.length, embedded]);

    useEffect(() => {
        if (!formOpen || !form.country_id) { setStates([]); return; }
        let current = true;
        void getStates(form.country_id).then(data => { if (current) setStates(data); })
            .catch(e => { if (current) setError(e instanceof Error ? e.message : "Could not load states."); });
        return () => { current = false; };
    }, [formOpen, form.country_id]);

    useEffect(() => {
        if (!formOpen || !form.state_id) { setCities([]); return; }
        let current = true;
        void getCities(form.state_id).then(data => { if (current) setCities(data); })
            .catch(e => { if (current) setError(e instanceof Error ? e.message : "Could not load cities."); });
        return () => { current = false; };
    }, [formOpen, form.state_id]);

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setBusy(true);
        setError("");
        try {
            const saved = await saveAddress(form, editingId);
            const updated = await getAddresses();
            setAddresses(updated);
            onChange?.(updated);
            onSelect?.(saved.id);
            setForm(emptyAddress);
            setEditingId(undefined);
            setFormOpen(false);
            onEditingChange?.(false);
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
            const updated = addresses.filter(address => address.id !== id);
            setAddresses(updated);
            onChange?.(updated);
            if (editingId === id) { setEditingId(undefined); setForm(emptyAddress); setFormOpen(false); onEditingChange?.(false); }
        } catch (e) {
            setError(e instanceof Error ? e.message : "Could not delete address.");
        } finally {
            setBusy(false);
        }
    }

    return <section className={embedded ? "" : "bg-white rounded-xl p-6 shadow-sm"} aria-labelledby="addresses-title">
        <h2 id="addresses-title" className={embedded ? "sr-only" : "text-lg font-bold text-primary mb-4"}>Shipping addresses</h2>
        {error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
        <div className="space-y-3 mb-6">
            {addresses.length === 0 && <p className="text-primary/70">No saved addresses.</p>}
            {addresses.map(saved => <div key={saved.id} className={`border rounded-lg p-4 ${selectedId === saved.id ? "border-secondary bg-secondary/5" : ""}`}>
                {onSelect && <label className="flex items-center gap-2 font-semibold mb-1"><input type="radio" name="checkout-address" checked={selectedId === saved.id} onChange={() => onSelect(saved.id)} /> Deliver here</label>}
                <p>{saved.recipient_name ? `${saved.recipient_name}, ` : ""}{saved.address}, {saved.city}, {saved.state}, {saved.country} {saved.postal_code}</p>
                <p className="text-sm text-primary/70">{saved.phone}</p>
                <div className="flex gap-4 mt-2">
                    <button type="button" className="text-primary underline" onClick={() => {
                        setEditingId(saved.id);
                        setForm({ recipient_name: saved.recipient_name || "", address: saved.address, country_id: saved.country_id, state_id: saved.state_id,
                            city_id: saved.city_id, postal_code: saved.postal_code, phone: saved.phone });
                        setFormOpen(true);
                        onEditingChange?.(true);
                    }}>Edit</button>
                    <button type="button" disabled={busy} className="text-red-700 underline disabled:opacity-50"
                        onClick={() => void remove(saved.id)}>Delete</button>
                </div>
            </div>)}
        </div>
        {!formOpen && <button type="button" className="px-5 py-2 bg-primary text-white rounded-lg" onClick={() => {
            setEditingId(undefined);
            setForm(emptyAddress);
            setFormOpen(true);
            onEditingChange?.(true);
        }}>Add address</button>}
        {formOpen && <form onSubmit={submit} className="space-y-4">
            <h3 className="font-semibold">{editingId ? "Edit address" : "Add address"}</h3>
            <label className="block">Recipient full name
                <input required={embedded} maxLength={255} value={form.recipient_name || ""} onChange={e => { setForm({ ...form, recipient_name: e.target.value }); onEditingChange?.(true); }}
                    className="block w-full border rounded-lg p-2 mt-1" />
            </label>
            <label className="block">Street address
                <textarea required maxLength={1000} value={form.address} onChange={e => { setForm({ ...form, address: e.target.value }); onEditingChange?.(true); }}
                    className="block w-full border rounded-lg p-2 mt-1" />
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
                <label className="block">Country
                    <select required value={form.country_id || ""} onChange={e => { setForm({ ...form, country_id: Number(e.target.value), state_id: 0, city_id: 0 }); onEditingChange?.(true); }}
                        className="block w-full border rounded-lg p-2 mt-1">
                        <option value="">Select country</option>
                        {(embedded ? countries.filter(option => option.name === "India") : countries).map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                    </select>
                </label>
                <label className="block">State
                    <select required value={form.state_id || ""} onChange={e => { setForm({ ...form, state_id: Number(e.target.value), city_id: 0 }); onEditingChange?.(true); }}
                        className="block w-full border rounded-lg p-2 mt-1">
                        <option value="">Select state</option>
                        {states.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                    </select>
                </label>
                <label className="block">City
                    <select required value={form.city_id || ""} onChange={e => { setForm({ ...form, city_id: Number(e.target.value) }); onEditingChange?.(true); }}
                        className="block w-full border rounded-lg p-2 mt-1">
                        <option value="">Select city</option>
                        {cities.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                    </select>
                </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                <label className="block">Postal code
                    <input required maxLength={embedded ? 6 : 20} pattern={embedded ? "[1-9][0-9]{5}" : undefined} inputMode="numeric" value={form.postal_code} onChange={e => { setForm({ ...form, postal_code: e.target.value }); onEditingChange?.(true); }}
                        className="block w-full border rounded-lg p-2 mt-1" />
                </label>
                <label className="block">Phone
                    <input required type="tel" maxLength={30} value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); onEditingChange?.(true); }}
                        className="block w-full border rounded-lg p-2 mt-1" />
                </label>
            </div>
            <div className="flex gap-3">
                <button disabled={busy} className="px-5 py-2 bg-primary text-white rounded-lg disabled:opacity-50">{busy ? "Saving…" : "Save address"}</button>
                <button type="button" onClick={() => { setEditingId(undefined); setForm(emptyAddress); setFormOpen(false); onEditingChange?.(false); }} className="underline">Cancel</button>
            </div>
        </form>}
    </section>;
}
