const incrementBtn=document.querySelector("#incrementBtn")
const decrementBtn=document.querySelector("#decrementBtn")
const showBtn=document.querySelector("#showBtn")
const moneyInput=document.querySelector("#moneyInput");
const balanceEl=document.querySelector("#balanceEl");
const listTable =document.querySelector("#list");
// let balance =0;
// function artir(m) {
//     balance+=m
// }
// function xercle(m) {
//     balance-=m
// }
// function show(m) {
//    console.log(balance);
// }
const bank={
    balance:0,
    limit:200,
    hesabat:[],
    date: new Date(),
    artir:function(m){
        if (this.balance>=this.limit || m<=0 || !m) {
            console.log("invalid limit");
    
            return;
        }
        this.balance+=m;
        const history ={
            type:"Cash",
            amount:m,
            created:this.date
        };
        this.hesabat.push(history);
        return this.balance
    },
    xercle:function(m){
      const checkValid=()=>{
        if (this.balance <=0) {
            console.log("invalid");
            return;
        }
        this.balance-=m;
        const history ={
            type:"Withdraw",
            amount:m,
            created:this.date
        };
        this.hesabat.push(history);
      };
      checkValid();
        return this.balance
    },

    show:function(m){
      console.log(this.balance);
      return this.balance
    },
}
incrementBtn.addEventListener("click",function(){
    const value= moneyInput.value;
    bank.artir(+value);
    moneyInput.value=""
})
decrementBtn.addEventListener("click",function(){
    const value= moneyInput.value;
    bank.xercle(+value)
    moneyInput.value=""
})
showBtn.addEventListener("click",function(){
   const result=bank.show();
   balanceEl.innerHTML=result;
   const newContent=bank.hesabat.map((item,index)=>`
   <tr>
   <th scope="row">${index+ 1}</th>
   <td>${item.type}</td>
   <td class="text-${item.type == "Cash" ? "success" : "danger"}">
   ${item.type == "Cash" ? "+" + item.amount : "-" + item.amount
}</td>
   <td>${item.created=new Date()}</td>
   `).join("");
   listTable.innerHTML = newContent;
})