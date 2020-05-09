const apiUrl = 'https://api.stackexchange.com/2.2/search/advanced';
const form = document.getElementById('search');
const advancedForm = document.querySelector('#search-advanced');
let searchUrl;
let pageSize;
let questionsData = [];
let paginateContainer = document.getElementById('paginate');
let searchResultsUI = document.querySelector('#search-results');
let loader = document.getElementsByClassName('loading-bar')[0];

const fetchSearches = async (searchUrl) => {
  try {
    loader.style.display = 'block';
    const res = await fetch(searchUrl)
    loader.style.display = 'none';
    return res.json();
  } catch (error) {
    console.log(error)
    loader.style.display = 'none';
    throw new Error(error);
  }
}

const rerenderUI = (size, data, page) => {
  const items = page * size - size;
  let paginatedDat = [...data].splice(items, size);

  searchResultsUI.innerHTML = '';

  searchResultsUI.innerHTML = searchUI(paginatedDat);
}

const searchUI = (data) => data.map((prop) => {
  
    let { tags, owner, is_answered, answer_count, score, creation_date, link, title } = prop;
  
    const tagUI = tags.map(tag => `<li>${tag}</li>`).join('')
    return `
    <div class="question-card">
          <div class="question-counts">
            <div class="question-votes">
              <h3>${score}</h3>
              <h6>Votes</h6>
            </div>
            <div class="answers-count">
              <h3>${answer_count}</h3>
              <h6>answers</h6>
            </div>
          </div>
          <div class="question">
            <a class="question-title" href="${link}">
              ${title}
            </a>
            <div class="question-info">
              <ul>
                ${tagUI}
              </ul>
              <div class="question-user">
                <h6>Asked ${creation_date} by 
                  <img src=${owner.profile_image} alt=${owner.display_name}>
                  <a href=${owner.link}>
                  ${owner.display_name}
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
    `;
  }).join('');

const renderSearchResults = (data, page = 10) => {
  searchResultsUI.innerHTML = '';
  questionsData = data.items;
  pageSize = page;
  let copyData = [...questionsData];

  let paginatedData = copyData.splice(0, +page);

  let pages = Math.ceil(questionsData.length/page);
  if(questionsData.length !== 0) {
  displayPagination(pages);
  }
  searchResultsUI.innerHTML = searchUI(paginatedData);
}

let paginationPage = parseInt(paginateContainer.getAttribute('actpage'), 10);

function changePage(event) {
  const go = this.getAttribute('href').replace('#!', '')
  if (go === '+1') {
    paginationPage++;
  } else if (go === '-1') {
    paginationPage--;
  }else{
    paginationPage = parseInt(go, 10);
  }

  const paginat = document.querySelector('#paginate');
  paginat.setAttribute('actpage', paginationPage);

  rerenderUI(pageSize, questionsData, paginationPage);
}

function displayPagination (pages) {
    const pageQuestion = Array(pages).fill().map((_, i) => {
      const pageNumber = i + 1;
      return `<a href="#!${pageNumber}" class="cdp_i">${pageNumber}</a>`
    }).join('');

    paginateContainer.innerHTML = `
    <a href="#!-1" class="cdp_i">prev</a>
      ${pageQuestion}
    <a href="#!+1" class="cdp_i">next</a>
    `;

    const pageBtn = document.getElementsByClassName('cdp_i');

    [...pageBtn].map( btn => btn.addEventListener("click", changePage));
};

const submitSearch = async (event) => {
  try {
    event.preventDefault();
    const searchElement = event.target.searchInput.value;
    if (searchElement) {
      const results = await fetchSearches(`${apiUrl}?q=${searchElement}&site=stackoverflow&sort=votes&pagesize=100`);
      renderSearchResults(results);
    }
  } catch (error) {
    
  }
}

form.addEventListener('submit', submitSearch);

/**************************** Advanced Form ********************************************/

const modal = document.getElementById('modal-form');

const openModal = document.getElementById('advance-search-btn');

const closeX = document.getElementsByClassName('close')[0];

const advanceSearchCancel = document.getElementsByClassName('advanced-search-cancel')[0];

openModal.onclick = function() {
  modal.style.display = 'block';
}

closeX.onclick = function() {
  modal.style.display = 'none';
}

advanceSearchCancel.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

/************************  Advanced Form ********************************/
const submitAdvancedSearch = async (event) => {
  event.preventDefault();
  try {
    const searchElement = event.target.SearchTerm.value;
    const accepted = event.target.accepted.value;
    const answers = event.target.answers.value;
    const body = event.target.body.value;
    const closed = event.target.closed.value;
    const migrated = event.target.migrated.value;
    const notice = event.target.notice.value;
    const nottagged = event.target.nottagged.value;
    const tagged = event.target.tagged.value;
    const title = event.target.title.value;
    const user = event.target.user.value;
    const url = event.target.url.value;
    const views = event.target.views.value;
    const wiki = event.target.wiki.value;
    const order = event.target.order.value;
    const sort = event.target.sort.value;
    const fromdate = event.target.fromdate.value;
    const todate = event.target.todate.value;
    pageSize = event.target.pagesize.value;
    const page = event.target.page.value;

    searchUrl = `${apiUrl}?page=${page}&q=${searchElement}&accepted=${accepted}&answers=${answers}&body=${body}&closed=${closed}&migrated=${migrated}&notice=${notice}&nottagged=${nottagged}&tagged=${tagged}&title=${title}&user=${user}&url=${url}&views=${views}&wiki=${wiki}&sort=${sort}&todate=${todate}&fromdate=${fromdate}&site=stackoverflow&pagesize=100`;
    const results = await fetchSearches(searchUrl);

    renderSearchResults(results, pageSize || 10);
    modal.style.display = 'none';
  } catch (error) {
    
  }
};

advancedForm.addEventListener('submit', submitAdvancedSearch);


/**************************** Pagination *******************************/
  let style = document.querySelector('style');


  const paginateCss = Array(19).fill().map((_, i) => {
    let paggy = i + 1;
    return `
    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy - 2}):not(:first-child):not(:nth-child(2)) {
      display: inline-block;
      pointer-events: none;
      color: transparent;
      border-color: transparent;
      width: 50px;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy - 2}):not(:first-child):not(:nth-child(2)):after {
      content: '...';
      color: #747474;
      font-size: 32px;
      margin-left: -6px;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy - 1}):not(:first-child) {
      display: inline-block;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy}):not(:first-child) {
      display: inline-block;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy + 1}) {
      background-color: #ff7f50;
      color: #fff;
      display: inline-block;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy + 1}) + .cdp_i:last-child {
      display: none !important;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy + 2}):not(:last-child) {
      display: inline-block;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(${paggy + 3}):not(:last-child) {
      display: inline-block;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(#{$i + 4}):not(:last-child):not(:nth-last-child(2)) {
      display: inline-block;
      pointer-events: none;
      color: transparent;
      border-color: transparent;
      width: 50px;
    }

    .cdp[actpage="${paggy}"] .cdp_i:nth-child(#{$i + 4}):not(:last-child):not(:nth-last-child(2)):after {
      content: '...';
      color: #747474;
      font-size: 32px;
      margin-left: -6px;
    }
  `
  }).join('');

  let stylesPages = `
  @keyframes cdp-in {
    from {
      transform: scale(1.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .cdp {
    position: relative;
    text-align: center;
    padding: 20px 0;
    font-size: 0;
    z-index: 6;
    margin: 50px 0;
    animation: cdp-in 500ms ease both;
    animation-timeout: 200ms;
  }
  .cdp_i {
    font-size: 14px;
    text-decoration: none;
    transition: background 250ms;
    display: inline-block;
    text-transform: uppercase;
    margin: 0 3px 6px;
    height: 38px;
    min-width: 38px;
    border-radius: 38px;
    border: 1px solid #E0E0E0;
    line-height: 38px;
    padding: 0;
    color: #747474;
    font-weight: 700;
    letter-spacing: .03em;
    display: none;
  }
  .cdp_i:first-child, .cdp_i:last-child {
    padding: 0 16px;
    margin: 0 12px 6px;
  }
  .cdp_i:last-child, .cdp_i:nth-child(2), .cdp_i:nth-last-child(2) {
    display: inline-block;
  }
  .cdp_i:hover {
    background-color: #ff7f50;
    color: #fff;
  }
  .cdp:not([actpage="1"]) .cdp_i:nth-child(1) {
    display: inline-block;
  }
  `
  style.innerHTML = stylesPages + paginateCss;


