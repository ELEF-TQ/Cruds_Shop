
/*_____________ VARIABLES ______________ */
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let tableBody = document.getElementById('tbody')
let deleteAllBtn = document.getElementById('deleteAll')
let search = document.getElementById('search')
let temp //save update index
let mode = 'create'
let searchMode = 'title' 
/*_____________ FUNCTIONS ______________ */


//__  Get Total Price :
function getTotal(){  
    if(price.value != ''){
        /*add + before to transform string to int*/
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.classList.remove('bg-danger')
        total.classList.add('bg-success')
    }else {
        total.innerHTML = 0
        total.classList.add('bg-danger')
    }
}
//__  Create New Product :
let ProductData = []
localStorage.product != null ? ProductData = JSON.parse(localStorage.product) : ProductData = [];
submit.onclick = function(){
    let newProduct = {
        Title : title.value.toLowerCase() ,
        Price : price.value ,
        Taxes : taxes.value ,
        Ads : ads.value ,
        Discount : discount.value ,
        Category : category.value.toLowerCase() ,
        Total : total.innerHTML ,
        Count : count.value ,
    }
//__  Save Data in Local Storage :
    if(title.value!='' 
      && price.value!=''
      && category!='' 
      && newProduct.Count < 100){

        if(mode == 'create') {
            if(newProduct.Count > 1){
                for(let i=0 ; i <newProduct.Count ; i++){
                    ProductData.push(newProduct)
                }
            }else {
                ProductData.push(newProduct)
            }
        }else if(mode == 'update') {
            ProductData[temp] = newProduct
            // return to normal mode
            mode ='create' 
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
    /*Clear*/
    ClearData(); 
    }
   
    /*localStorage takes only string - transform array to string*/
    localStorage.setItem('product',JSON.stringify(ProductData))
   /*ShowData*/
   showData();
}
//__  Clear Inputs :
function ClearData() {
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
}
//__  Read :
function showData(){
    getTotal() //erase red mode in total
    let table='';
    for(let i=0 ; i < ProductData.length ; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${ProductData[i].Title}</td>
                <td>${ProductData[i].Price}</td>
                <td>${ProductData[i].Taxes}</td>
                <td>${ProductData[i].Ads}</td>
                <td>${ProductData[i].Discount}</td>
                <td>${ProductData[i].Total}</td>
                <td>${ProductData[i].Category}</td>
                <td><button onclick="updateItem(${i})" id="update" class="btn btn-warning">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete" class="btn btn-danger">delete</button></td>
            </tr>
          `
    }
    tableBody.innerHTML = table ;
    /*Create delete button*/
    if(ProductData.length > 0){
        deleteAllBtn.innerHTML = `
        <button onclick="deleteAll()" class="btn btn-danger w-100">Delete ALL : ${ProductData.length}</button>
        `
    }else {
        deleteAllBtn.innerHTML=''
    }
}
showData()
//__  Delete item :
function deleteItem(index){
  ProductData.splice(index,1)
  localStorage.product = JSON.stringify(ProductData)
  /*show elements after delete*/
  showData()
}
//__  Update item :
function updateItem(index){
    title.value = ProductData[index].Title
    price.value = ProductData[index].Price
    taxes.value = ProductData[index].Taxes
    ads.value = ProductData[index].Ads
    discount.value = ProductData[index].Discount
    category.value = ProductData[index].Category
    getTotal()
    count.style.display ='none'
    submit.innerHTML='Update'
    mode = 'update'
    temp = index //save update index
    scroll({
        top:0 ,
        behavior:"smooth",
    })
}
//__  Delete All Items :
function deleteAll(){
    localStorage.clear()
   ProductData = []
   showData()
}
//__  Search :
function getSearchMode(id){
    if(id == "searchTitle"){
        searchMode ='title'
    }
    else 
    if (id == "searchCategory"){
        searchMode = 'category'
    } 
    search.placeholder='Search By ' + searchMode
    search.focus()  
    search.value=''
    showData()
}
function searchItem(value){
  let table=''
  /*Search By Title */
  if(searchMode == 'title'){
    for(let i=0 ; i < ProductData.length ; i++){
        if(ProductData[i].Title.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${ProductData[i].Title}</td>
                <td>${ProductData[i].Price}</td>
                <td>${ProductData[i].Taxes}</td>
                <td>${ProductData[i].Ads}</td>
                <td>${ProductData[i].Discount}</td>
                <td>${ProductData[i].Total}</td>
                <td>${ProductData[i].Category}</td>
                <td><button onclick="updateItem(${i})" id="update" class="btn btn-warning">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete" class="btn btn-danger">delete</button></td>
            </tr>
          `
        }
    }
  }

  /*Search By Category */
  else {
    for(let i=0 ; i < ProductData.length ; i++){
        if(ProductData[i].Category.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${ProductData[i].Title}</td>
                <td>${ProductData[i].Price}</td>
                <td>${ProductData[i].Taxes}</td>
                <td>${ProductData[i].Ads}</td>
                <td>${ProductData[i].Discount}</td>
                <td>${ProductData[i].Total}</td>
                <td>${ProductData[i].Category}</td>
                <td><button onclick="updateItem(${i})" id="update" class="btn btn-warning">update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete" class="btn btn-danger">delete</button></td>
            </tr>
          `
        }
    }
  }
  tableBody.innerHTML = table ;
}

