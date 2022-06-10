const rooms = {
    '1': [{
            id: 1,
            image: "abc",
            name: "abc"
        },
        {
            id: 2,
            image: "abc",
            name: "abc"
        },
        {
            id: 13,
            image: "abc",
            name: "abc"
        },
    ],
    '4': [{
            id: 1,
            image: "abc",
            name: "abc"
        },
        {
            id: 2,
            image: "abc",
            name: "abc"
        },
        {
            id: 13,
            image: "abc",
            name: "abc"
        },
    ]
}

for (let key in rooms) {
    let index = rooms[key].findIndex(user => user.id === 13);
    if (index === -1) {
        continue;
    }
    rooms[key].splice(index, 1)
}
console.log(JSON.stringify(rooms))