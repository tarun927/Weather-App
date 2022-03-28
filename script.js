let getBtn = document.querySelector(".getBtn")
let tbody = document.querySelector(".tBody")
let sideArr = document.querySelector(".sideTable").children[0].children
let idx = 0;
const arr = ["London","New York","Los Angeles","Las Vegas"]
let getData=()=>{
    document.querySelector(".noData").remove()  //removing noData row
   
    let intr = setInterval(async()=>{
        if(idx==4) return clearInterval(intr)
      try {
        //highlighting in SideBar
        for(let ele of sideArr){
            if(ele.children[0].innerHTML==arr[idx]){
                ele.children[0].style.border = "4px solid green"
            }
        }

        //fetching Data
        let url = "https://python3-dot-parul-arena-2.appspot.com/test?cityname="+arr[idx]
        let res = await fetch(url);
        let data = await res.json();
        console.log(arr[idx],data)


        //data age
        let data_age = Math.abs(new Date()-new Date(data.date_and_time.replace(/-/g,'/')))
        data_age = Math.round(data_age*0.00000027778)
       
        //inserting Row
        const row = document.createElement('tr')
        row.classList.add('singleCity')
        row.innerHTML += `
        <td class="cityName">${arr[idx]}</td>
        <td><input value=${data.description}></input></td>
        <td>${data.temp_in_celsius}</td>
        <td>${data.pressure_in_hPa}</td>
        <td>${data_age}</td>
        <td class="deleteBtn">delete</td>
        `
        tbody.appendChild(row)
         
        //delete
        let deleteBtn= row.querySelector(".deleteBtn")
        deleteBtn.addEventListener('click',()=>{
            row.remove()
        })

        //clearing Interval
        idx++;
        if(idx==4) clearInterval(intr)
      } catch (error) {
          console.log(error)
      }
    },2000)
}
getBtn.addEventListener('click',getData)


//Searching
let searchInput =  document.querySelector(".searchInput")
let searchBtn = document.querySelector(".searchBtn")
searchBtn.addEventListener('click',()=>{
    console.log("first")
    let cities = document.querySelectorAll(".cityName")
    cities.forEach((city)=>{
        if(city.innerHTML.toLowerCase()==searchInput.value.toLowerCase()){
            city.parentNode.classList.add("bgYellow")

            setTimeout(()=>{
                city.parentNode.classList.remove("bgYellow")
            },3000)
        }
    })
})