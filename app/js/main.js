const SearchModule = (function () {
    const data = [
        {
          "id": "123-s2-546",
          "name": "John Jacobs",
          "items": ["bucket", "bottle"],
          "address": "1st Cross, 9th Main, abc Apartment",
          "pincode": "5xx012"
        },
        {
          "id": "123-s3-146",
          "name": "David Mire",
          "items": ["Bedroom Set"],
          "address": "2nd Cross, BTI Apartment",
          "pincode": "4xx012"
        },
        {
          "id": "223-a1-234",
          "name": "Soloman Marshall",
          "items": ["bottle"],
          "address": "Riverbed Apartment",
          "pincode": "4xx032"
        },
        {
          "id": "121-s2-111",
          "name": "Ricky Beno",
          "items": ["Mobile Set"],
          "address": "Sunshine City",
          "pincode": "5xx072"
        },
        {
          "id": "123-p2-246",
          "name": "Sikander Singh",
          "items": ["Air Conditioner"],
          "address": "Riverbed Apartment",
          "pincode": "4xx032"
        },
        {
          "id": "b23-s2-321",
          "name": "Ross Wheeler",
          "items": ["Mobile"],
          "address": "1st Cross, 9th Main, abc Apartement",
          "pincode": "5xx012"
        },
        {
          "id": "113-n2-563",
          "name": "Ben Bish",
          "items": ["Kitchen Set", "Chair"],
          "address": "Sunshine City",
          "pincode": "5xx072"
        },
        {
          "id": "323-s2-112",
          "name": "John Michael",
          "items": ["Refrigerator"],
          "address": "1st Cross, 9th Main, abc Apartement",
          "pincode": "5xx012"
        },
        {
          "id": "abc-34-122",
          "name": "Jason Jordan",
          "items": ["Mobile"],
          "address": "Riverbed Apartment",
          "pincode": "4xx032"
        }
      ]
    const init = function() {
        setHandlers();
    };

    const setHandlers = function() {
        let inputElement = document.querySelector('.search-box');
        let listItems = document.querySelectorAll("#search-results li");
        let counter = 0;
        inputElement.addEventListener('keyup', handleSearchQuery);
        document.addEventListener("keydown",handlingEvent);

        function handlingEvent(e) {
           listItems[counter].classList.add("active");
          if(event.keyCode === 38) {
              //Up Arrow
              listItems[counter].classList.remove("active");
              counter = counter > 0 ? --counter : 0;     // Decrease the counter      
              listItems[counter].classList.add("active");
          } else if (event.keyCode === 40) {
              //Down Arrow
              listItems[counter].classList.remove("active");
              counter = counter < listItems.length-1 ? ++counter : listItems.length-1; // Increase counter 
              listItems[counter].classList.add("active");      
          }
        }
    }

    const handleSearchQuery = function() {
        let searchResults = document.querySelector('#search-results');
        let searchQuery = document.querySelector('.search-box').value;
        searchResults.classList.remove('search-results')
        let filteredData;
        if(searchQuery && searchQuery.length > 0){
            filteredData = search(searchQuery)
        }
        searchResults.innerHTML = ""
        if(filteredData && filteredData.length === 0){
            let ele = document.createElement('li');
            let markup = NoResultFoundCard();
            ele.innerHTML = markup.trim();
            searchResults.classList.add('search-results')
            searchResults.appendChild(ele.firstChild)
        }
        filteredData && filteredData.forEach(function(obj, index){
            let ele = document.createElement('li');
            let markup = createSearchList(obj,index);
            ele.innerHTML = markup.trim();
            searchResults.classList.add('search-results')
            searchResults.appendChild(ele.firstChild);
        }); 
    
    }

    const search = function(query) {
        //Normalize search query by converting to lowercase same applies to object value
        let searchLower = query.toLowerCase();
        let filtered = data.filter(obj => {
        if (obj.name.toLowerCase().includes(searchLower)) {
        return true;
        }
        
        if (obj.address.toLowerCase().includes(searchLower)) {
        return true;
        }

        if (obj.pincode.toLowerCase().includes(searchLower)) {
            return true;
        }
        
        //now we search in items as well
        let filteredItems = obj.items.filter(item => {
        if (item.toLowerCase().includes(searchLower)) {
        return true; 
        }
        
        return false;
        });
        
        if (filteredItems.length > 0) {
        return true;
        }
        
        let searchResults = document.querySelector('#search-results');
        searchResults.classList.remove('search-results')
        return false;
        })
        
        return filtered;
    }

    const createSearchList = function(obj, idx) {  
        return ` <li role="presentation" tabindex="-1" class="card">
                    <span class="card-id">${highlightSearchText(obj.id)}</span>
                    <span class="card-text">${highlightSearchText(obj.name)}</span>
                    <span class="card-text" style='color: #0000FF;'>${highlightSearchText(obj.items)}</span>
                    <span class="card-text">${highlightSearchText(obj.address)}</span>
                    <span class="card-text">${highlightSearchText(obj.pincode)}</span>
                </li>`
    }

    const NoResultFoundCard = function() {
        return `<li role="presentation" tabindex="-1" class="card">
                  <span class="empty-text"> No User Found </span>
                </li>`
    }

    const highlightSearchText = function(value) {
        let searchQuery = document.querySelector('.search-box').value;
        let regex = new RegExp(searchQuery, 'gi')
        let response;
        if(typeof value === "object") {
           let stringValue = value.toString();
           if(stringValue.toLowerCase().includes(searchQuery.toLowerCase())) { 
            response = `${""+searchQuery+ " found in items"}`;
           }else{
            response = ''
           }
        } else {
            response = value.replace(regex, function(str) {
                return "<span style='color: #0000FF;'>" + str + "</span>"
            })
        }
        return response
    }

    return {
      init: init
    };
  
  })();
  
  SearchModule.init();