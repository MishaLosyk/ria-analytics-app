

let headRow = document.getElementById('headRow');
let tableBody = document.getElementById('tableBody');
let sub = document.getElementById('sub');

const data2 = [
    {
        haveSubRequest: false,
        from: 'slon_facts',
        select: [   
                    {
                        name: 'user_id',
                        type: 'unInt',
                        value: 'user_id'
                    },
                    {
                        name: 'marka_id',
                        type: 'Array(int)',
                        value: 'marka_id'
                    }
                ],
        where:  [],
        group:  [],
        sort:   ['EventDate'],
        date:   ["EventDate < '2021-03-22' AND EventDate > '2020-02-01'"]       
    }
]




const data = [
    {
        haveSubRequest: false,
        from: 'slon_facts',
        select: [   
                    {
                        name: 'user_id',
                        type: 'unInt',
                        value: 'count(user_id)'
                    },
                    {
                        name: 'marka_id',
                        type: 'Array(int)',
                        value: 'marka_id'
                    }
                ],
        where:  [],
        group:  ['HourDate'],
        sort:   ['EventDate'],
        date:   ["EventDate < '2021-03-22' AND EventDate > '2020-02-01'"]       
    },
    'UNION ALL',
    {           
        haveSubRequest: true,
        from:   {
                    haveSubRequest: true,
                    from:   {
                                haveSubRequest: false,
                                from: 'slon_facts',
                                select: [   
                                            {
                                                name: 'user_id',
                                                type: 'unInt',
                                                value: 'count(user_id)'
                                            },
                                            {
                                                name: 'marka_id',
                                                type: 'Array(int)',
                                                value: 'marka_id'
                                            }
                                        ],
                                where:  ['user_id > 3000'],
                                group:  [],
                                sort:   [],
                                date:   ["EventDate < '2021-03-22' AND EventDate > '2020-02-01'"]
                            },
                    select: [   
                                {
                                    name: 'user_id',
                                    type: 'unInt',
                                    value: 'count(user_id)'
                                },
                                {
                                    name: 'marka_id',
                                    type: 'Array(int)',
                                    value: 'marka_id'
                                }
                            ],
                    where:  ['user_id > 3000'],
                    group:  [],
                    sort:   [],
                    date:   ["EventDate < '2021-03-22' AND EventDate > '2020-02-01'"]
                },
        select: [   
                    {
                        name: 'user_id',
                        type: 'unInt',
                        value: 'count(user_id)'
                    },
                    {
                        name: 'marka_id',
                        type: 'Array(int)',
                        value: 'marka_id'
                    }
                ],
        where:  ['user_id > 3000'],
        group:  [],
        sort:   [],
        date:   ["EventDate < '2021-03-22' AND EventDate > '2020-02-01'"]  
    }   
];

console.log(data);


sub.addEventListener('click', async (e)=>{
    e.preventDefault();
    let req = await fetch('http://localhost:8081/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)

    });
    let res = await req.json();
    console.log(res);

});

async function getData() {
   let data = await fetch('http://localhost:8081/');  
   let json = await data.json();

   console.log(json);
   
    for(let i in json.meta) {
        let th = document.createElement('th');
        th.innerHTML = json.meta[i].name;
        headRow.appendChild(th);   
    }

    for(let i in json.data) {
        let tb = document.createElement('tr');
        tableBody.appendChild(tb);
        
        let rows = json.data[i];
        for (let j in rows) {
            let td = document.createElement('td');
            
            if (Array.isArray(rows[j])){
                td.innerHTML = [...rows[j]];
            }   else {td.innerHTML = rows[j];}
            tableBody.lastChild.appendChild(td);
        }
    }
} 

getData();
