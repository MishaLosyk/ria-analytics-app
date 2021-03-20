

let headRow = document.getElementById('headRow');
let tableBody = document.getElementById('tableBody');
let sub = document.getElementById('sub');

let data = 
    [
        {
            haveSubRequest: false,
            from: 'someTable',
            select: [],
            where:  [],
            group:  [],
            sort:   [],
            date:   []       
        },
        'UNION',
        {           
            haveSubRequest: true,
            from:   {
                        haveSubRequest: false,
                        from: 'someTable',
                        select: [],
                        where:  [],
                        group:  [],
                        sort:   [],
                        fromDate: [],
                        date: []
                    },
            select: [],
            where:  [],
            group:  [],
            sort:   [],
            date: []
      
        }   
        
    ]


console.log(data);


sub.addEventListener('click', async (e)=>{
    e.preventDefault();
    let req = await fetch('http://localhost:8081/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    });
    // let res = await req.json();
    // console.log(res);

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
