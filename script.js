var date = document.getElementById("date");
date.innerHTML = new Date().toLocaleDateString();


document.getElementById('btn-opt').style.display=  "none"; 
const loading = document.querySelector(".loading");

var state = {
  page: 1,
  rows: 5,
  window: 5,
};

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    showLoading();
  }
});



window.addEventListener("touchmove", butttonClick);

  function butttonClick(){
    window.removeEventListener("touchmove", butttonClick);
    document.getElementById('btn-opt').style.display=  "block"; 
    var optButton = document.getElementById('btn-opt');
    optButton.addEventListener('click',()=>{
        loading.classList.add("show");
        state.page += 1;
        getPost();
    })
  }

//   butttonClick();
 

function showLoading() {
  loading.classList.add("show");
  state.page += 1;
  getPost();
}

async function getPost() {
  const postResponse = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=MtedJN6g0y3f0nsDVjCHieZLfUsHtYKH`
  );
  const postData = await postResponse.json();
  createCards(postData.results);
}

getPost();

function pagination(data, page, rows) {
  var trimStart = (page - 1) * rows;
  var trimEnd = trimStart + rows;

  var trimmedData = data.slice(trimStart, trimEnd);

  var pages = Math.round(data.length / rows);

  return {
    data: trimmedData,
    pages: pages,
  };
}

function createCards(data) {
  var datas = pagination(data, state.page, state.rows);
  console.log(datas.data);

  let row = document.getElementById("cards");

  if (datas.data.length > 0) {
    datas.data.forEach((element) => {
      let newsElement = `
      <div class="jumbotron " id="jumbo">
            <div class="row">
            <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
                <div class="row">
                    <div class="col-lg-8">
                        <div class = news-img>
                        <img src="${element.multimedia[0].url}" class="img-fluid" alt="news-img">
                        </div>
                    </div>
                    <div class="col-lg-4 titles">
                    <div class="content">
                        <h3>${element.title}</h3>
                        <p>${element.abstract}</p>
                        <div class= last>
                        <div class = flex-items>
                            <p>${element.byline}</p>
                            <p class="view-post"><a class="abs" href=${element.url} target="_blank">View Post</a></p>
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
               
            </div>
            <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <div class="share-btn-container">
                    <a href="https://www.facebook.com/sharer.php?u=${element.url}" class="facebook-btn" target="_blank">
                    <i class="fab fa-facebook"></i>
                    </a>
            
                    <a href="https://twitter.com/share?url=${element.url}&text=${element.title}" class="twitter-btn" target="_blank">
                    <i class="fab fa-twitter"></i>
                    </a>
            
                    <a href="https://pinterest.com/pin/create/bookmarklet/?media=${element.multimedia[0].url}&url=${element.url}&description=${element.title}" class="pinterest-btn" target="_blank">
                    <i class="fab fa-pinterest"></i>
                    </a>
            
                    <a href="https://www.linkedin.com/shareArticle?url=${element.url}&title=${element.title}" class="linkedin-btn" target="_blank">
                    <i class="fab fa-linkedin"></i>
                    </a>
            
                    <a href="https://wa.me/?text=${element.title} ${element.url}" class="whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
                    </div>
                    
                    
        </div>  
            
      </div>
        `;
      let temp = document.createElement("div");
      temp.innerHTML = newsElement;
      row.appendChild(temp);
    });
  } else {
    swal(
      "Thats all for Today Folks!!!",
      "To Read More visit: https://www.nytimes.com/",
      "success"
    );
    loading.classList.remove("show");
    document.getElementById('btn-opt').style.display=  "none"; 
    
  }
  document.getElementById("main-container").append(row);
  loading.classList.remove("show");

 
}
