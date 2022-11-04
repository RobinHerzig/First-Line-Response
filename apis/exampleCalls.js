commercialFireAlarm = {
  "_id": "6364a6051306332d8c9d50c0",
  "callNotes": [
    "Fri Nov 04 2022 13:42:11 GMT-0500 (Central Daylight Time): Manager states fire alarm activated",
    "Fri Nov 04 2022 13:42:17 GMT-0500 (Central Daylight Time): No smoke, no flames",
    "Fri Nov 04 2022 13:42:49 GMT-0500 (Central Daylight Time): Customers and employees evacuating",
    "Fri Nov 04 2022 13:45:12 GMT-0500 (Central Daylight Time): Engine4 arrived. No smoke, no flames. Building evacuated. Establishing command"
  ],
  "user": {
    "$oid": "635897553eb8d724404e3974"
  },
  "date": "Fri Nov 04 2022 13:41:25 GMT-0500 (Central Daylight Time)",
  "response": [{
    "_id": { "$oid": "6364a6e81306332d8c9d5111" },
    "apparatus": "Engine4",
    "tone": "13:43:25",
    "enroute": "13:43:55",
    "arrival": "13:44:36",
    "departure": null,
    "quarters": null
  },
  {
    "_id": { "$oid": "6364a6e81306332d8c9d5112" },
    "apparatus": "Quint5",
    "tone": "13:43:25",
    "enroute": "13:44:00",
    "arrival": null,
    "departure": null,
    "quarters": null
  },
  {
    "_id": { "$oid": "6364a6e81306332d8c9d5112" },
    "apparatus": "Quint6",
    "tone": "13:43:25",
    "enroute": "13:44:12",
    "arrival": null,
    "departure": null,
    "quarters": null
  },
  {
    "_id": { "$oid": "6364a6e81306332d8c9d5113" },
    "apparatus": null,
    "tone": null,
    "enroute": null,
    "arrival": null,
    "departure": null,
    "quarters": null
  }],
  "__v": {
    "$numberInt": "8"
  },
  "address": "284 2nd St",
  "business": "Corner Store",
  "city": "Dallas",
  "first": "John",
  "last": "Smith",
  "phone": "555 123-4567",
  "type": "Commercial Fire Alarm"
}

MedicalEmergency = {
  "_id": "636555b85747b8344cde4d17",
  "callNotes": [
    "Fri Nov 04 2022 13:35:04 GMT-0500 (Central Daylight Time): Male stubbed toe, requesting medics",
    "Fri Nov 04 2022 13:35:25 GMT-0500 (Central Daylight Time): Conscious and breathing",
    "Fri Nov 04 2022 13:38:07 GMT-0500 (Central Daylight Time): Medic10 patient contact",
  ],
  "user": {
    "$oid": "635897553eb8d724404e3974"
  },
  "date": "Fri Nov 04 2022 13:34:49 GMT-0500 (Central Daylight Time)",
  "response": [{
    "_id": { "$oid": "6364a6e81306332d8c9d5111" },
    "apparatus": "Medic10",
    "tone": "13:35:43",
    "enroute": "13:35:59",
    "arrival": "13:37:53",
    "departure": null,
    "quarters": null
  },
  {
    "_id": { "$oid": "6364a6e81306332d8c9d5112" },
    "apparatus": "Engine10",
    "tone": "13:35:43",
    "enroute": "13:36:04",
    "arrival": "13:38:09",
    "departure": null,
    "quarters": null
  },
  {
    "_id": { "$oid": "6364a6e81306332d8c9d5113" },
    "apparatus": null,
    "tone": null,
    "enroute": null,
    "arrival": null,
    "departure": null,
    "quarters": null
  }],
  "__v": {
    "$numberInt": "8"
  },
  "address": "2669 Main St",
  "business": "",
  "city": "Dallas",
  "first": "Jane",
  "last": "Doe",
  "phone": "555 123-8637",
  "type": "Medical Emergency"
}

module.exports = {commercialFireAlarm, MedicalEmergency}