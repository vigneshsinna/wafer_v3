# Indian PIN directory snapshot

`india-pincodes-2026.csv` contains 19,538 distinct PIN and state pairs from the June 2026 [AllIndiaPincodeDirectory mirror](https://github.com/sathishkvn1/AllIndiaPincodeDirectory/blob/0da81faba9292eb12d9ebe5139fc758ab1ef760a/all-india-pincode-html-csv-Ver-2026.csv) of the Department of Posts [All India Pincode Directory](https://data.gov.in/catalog/all-india-pincode-directory-through-webservice). Source commit: `0da81faba9292eb12d9ebe5139fc758ab1ef760a` (7 June 2026). The compact file keeps only PIN, district and state because checkout checks PIN existence and state agreement; it does not determine courier serviceability. Its SHA-256 is `627ECF4411BE3B83FEBBC42C84921C2596C59C5DE7F8484796D436991B56CDA3`.

The migration adds missing pairs without removing an existing directory. To refresh from a newer official CSV, use `php artisan pincode:import path/to/latest.csv` after validating the source and taking a database backup.
