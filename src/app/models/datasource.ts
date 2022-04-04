export let sampleData = [
    {
        userID: 1,
        userName: 'Dane',
        email:'dane@gmail.com',
        gender: 'female',
        contact:98989898,
        category:'manager',
        subusers: [
           { userID: 2, userName: 'Ajmal', gender: 'male', email: 'ajma@gmail.com', contact: 3666666, category: 'employer' },
            ]
    },
    {
        userID: 3,
        userName: 'Asif',
        gender: 'male',
        email:'asif@gmail.com',
        contact: 345355,
        category: 'manager',
        subusers: [
           { userID: 4, userName: 'Lily', gender: 'male', email: 'lily@gmail.com', contact: 25353, category: 'employer' },
            { userID:5 , userName: 'John', gender: 'male', email: 'john@gmail.com', contact: 76686662, category: 'employer' }
        ]
    },
   
];