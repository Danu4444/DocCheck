export const doctors = [
    {
        id: 1,
        name: "Dr. Emily Carter",
        specialty: "Cardiologist",
        hospital: "City General Hospital",
        location: "New York, NY",
        available: true,
        avatar: "https://picsum.photos/seed/doc1/200/200",
    },
    {
        id: 2,
        name: "Dr. Ben Hanson",
        specialty: "Dermatologist",
        hospital: "Downtown Medical Center",
        location: "San Francisco, CA",
        available: true,
        avatar: "https://picsum.photos/seed/doc2/200/200",
    },
    {
        id: 3,
        name: "Dr. Sarah Lee",
        specialty: "Pediatrician",
        hospital: "Sunrise Clinic",
        location: "Los Angeles, CA",
        available: false,
        avatar: "https://picsum.photos/seed/doc3/200/200",
    },
    {
        id: 4,
        name: "Dr. Michael Chen",
        specialty: "Neurologist",
        hospital: "City General Hospital",
        location: "New York, NY",
        available: true,
        avatar: "https://picsum.photos/seed/doc4/200/200",
    },
    {
        id: 5,
        name: "Dr. Jessica Rodriguez",
        specialty: "Orthopedist",
        hospital: "Downtown Medical Center",
        location: "San Francisco, CA",
        available: false,
        avatar: "https://picsum.photos/seed/doc5/200/200",
    },
];

export const patients = [
    {
        id: 1,
        name: "Jane Doe",
        age: 34,
        avatar: "https://picsum.photos/seed/avatar1/200/200",
    },
     {
        id: 2,
        name: "John Smith",
        age: 45,
        avatar: "https://picsum.photos/seed/avatar2/200/200",
    },
     {
        id: 3,
        name: "Alice Johnson",
        age: 28,
        avatar: "https://picsum.photos/seed/avatar3/200/200",
    },
    { 
        id: 4, 
        name: "Bob Williams", 
        age: 52, 
        avatar: "https://picsum.photos/seed/avatar4/200/200" 
    },
    { 
        id: 5, 
        name: "Charlie Brown", 
        age: 61, 
        avatar: "https://picsum.photos/seed/avatar5/200/200" 
    },
    { 
        id: 6, 
        name: "Diana Prince", 
        age: 31, 
        avatar: "https://picsum.photos/seed/avatar6/200/200" 
    },
];

export const appointments = [
    {
        token: 7,
        patient: patients[1],
        doctor: doctors[0],
    },
    {
        token: 8,
        patient: patients[2],
        doctor: doctors[0],
    },
    {
        token: 9,
        patient: patients[3],
        doctor: doctors[0],
    },
    {
        token: 10,
        patient: patients[4],
        doctor: doctors[0],
    },
    {
        token: 11,
        patient: patients[5],
        doctor: doctors[0],
    },
     {
        token: 12,
        patient: patients[0],
        doctor: doctors[0],
    },
];

export const medicalHistory = [
    {
        id: 1,
        patientId: 1,
        date: "August 12, 2023",
        doctor: doctors[1],
        diagnosis: "Acne Vulgaris",
        prescription: [
            "Tretinoin Cream 0.05%",
            "Doxycycline 100mg once daily",
        ]
    },
    {
        id: 2,
        patientId: 1,
        date: "May 20, 2023",
        doctor: doctors[0],
        diagnosis: "High Blood Pressure",
        prescription: [
            "Lisinopril 10mg once daily",
        ]
    },
    {
        id: 3,
        patientId: 1,
        date: "January 5, 2023",
        doctor: doctors[4],
        diagnosis: "Sprained Ankle",
        prescription: [
            "Ibuprofen 600mg as needed for pain",
            "Physical therapy referral"
        ]
    },
    {
        id: 4,
        patientId: 2,
        date: "September 5, 2023",
        doctor: doctors[0],
        diagnosis: "Seasonal Allergies",
        prescription: [
            "Cetirizine 10mg once daily",
        ]
    }
]
