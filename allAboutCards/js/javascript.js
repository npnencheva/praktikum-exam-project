var onInit = function () {

    var getAllCardsData = async function () {
        return $.ajax({
            url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Knights%20of%20the%20Frozen%20Throne",
            method: "GET",
            "headers": {
                "x-rapidapi-key": "bbee0e493fmsh28a8b02915b4a18p1ce4d8jsn6fa1b706c260",
                "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
            },
            success: function (response) {
                return response;
            }
        });
    }

    var bindCardsData = function (element) {
        let miniCard = $('#cloneCard').clone();

        miniCard.attr("id", element.cardId);

        miniCard.find('.cardImage').attr("src", element.img);
        miniCard.find('.cardName').text(element.name);
        miniCard.find('.playerClass').text(element.playerClass);
        miniCard.find('.flavor').text(element.flavor);
        miniCard.find('.attack').text(element.attack);
        miniCard.find('.rarity').text(element.rarity);
        miniCard.find('.cardType').text(element.type);
        miniCard.find('.cost').text(element.cost);
        miniCard.find('.health').text(element.health);
        miniCard.find('.artist').text(element.artist);
        miniCard.find('.armor').text(element.armor);
        miniCard.find('.durability').text(element.durability);
        miniCard.find('.race').text(element.race);

        $('#card-list').prepend(miniCard);

        miniCard.show();
    }

    var buildCardsView = function (data) {
        $('#card-list').empty();

        data.forEach(element => {
            bindCardsData(element);
            
        });
    }

    var loadTopContainer = function () {
        $('#containerTop').removeAttr('hidden');
    }

    var loadCardsData = async function () {
        let data = await getAllCardsData();
        buildCardsView(data);
        loadTopContainer();
    }

    var getAllCards = async function () {
        let data = await getAllCardsData();
        buildCardsView(data);
    }

    var onClickEvent = async function () {

        $('#getAll').on('click', function () {
            $('#search-name').val("")

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-type-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0; 

            $('.form-check-input').prop('checked', false);

            getAllCards();
        });

        $('#listView').on('click', function () {
            $('.cards-container').removeClass("container-fluid");
            $('.cards-container').addClass("container");
            $('#card-list').removeClass("d-flex row flex-wrap");
            $('.list-group-item').removeClass("col-3");
            $('.item-container').addClass("row");
            $('.card-image-container').addClass("col-sm-4 col-lg-4");
            $('.card-info-container').addClass("col-sm-8 col-lg-8");
            $('.cardName').removeClass(" text-center");
            $('.artistName').removeClass(" text-center");
        });

        $('#gridView').on('click', function () {

            $('.cards-container').removeClass("container");
            $('.cards-container').addClass("container-fluid");
            $('#card-list').addClass("d-flex row flex-wrap");
            $('.list-group-item').addClass("col-3");
            $('.item-container').removeClass("row");
            $('.card-image-container').removeClass("col-sm-4 col-lg-4");
            $('.card-info-container').removeClass("col-sm-8 col-lg-8");
            $('.cardName').addClass(" text-center");
            $('.artistName').addClass(" text-center");
        });

        $('#common').on('click', async function () {
            $('#common').attr('checked', true);

            $('#search-name').val("")

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-type-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0;

            let data = await getAllCardsData();
            let filteredData = data.filter(element => {
                if (typeof (element.rarity) !== 'undefined') {
                    return element.rarity.toLowerCase() === $(this).val().toLowerCase();
                }
            });
            buildCardsView(filteredData);
        });

        $('#rare').on('click', async function () {
            $('#rare').attr('checked', true);

            $('#search-name').val("")

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-type-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0;

            let data = await getAllCardsData();
            let filteredData = data.filter(element => {
                if (typeof (element.rarity) !== 'undefined') {
                    return element.rarity.toLowerCase() === $(this).val().toLowerCase();
                }
            });
            buildCardsView(filteredData);
        });

        $('#epic').on('click', async function () {
            $('#epic').attr('checked', true);

            $('#search-name').val("")

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-type-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0;

            let data = await getAllCardsData();
            let filteredData = data.filter(element => {
                if (typeof (element.rarity) !== 'undefined') {
                    return element.rarity.toLowerCase() === $(this).val().toLowerCase();
                }
            });
            console.log(filteredData);
            buildCardsView(filteredData);
        });

        $('#legendary').on('click', async function () {
            $('#legendary').attr('checked', true);

            $('#search-name').val("")

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-type-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0;

            let data = await getAllCardsData();
            let filteredData = data.filter(element => {
                if (typeof (element.rarity) !== 'undefined') {
                    return element.rarity.toLowerCase() === $(this).val().toLowerCase();
                }
            });
            buildCardsView(filteredData);
        });
    }

    var onChangeEvent = async function () {

        $('#card-class-filter').on('change', async function () {

            $('#search-name').val("")

            $('#card-type-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0;

            $('.form-check-input').prop('checked', false);

            let selectedFilter = $('#card-class-filter :selected').val().toLowerCase();

            let data = await getAllCardsData();
            let filteredData = data.filter(element => {
                if (typeof (element.playerClass) !== 'undefined') {
                    return element.playerClass.toLowerCase().includes(selectedFilter);
                }
            });
            buildCardsView(filteredData); 
            
        });

        $('#card-type-filter').on('change', async function () {

            $('#search-name').val("")

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0;

            $('.form-check-input').prop('checked', false);

            let selectedFilter = $('#card-type-filter :selected').val().toLowerCase();

            let data = await getAllCardsData();
            let filteredData = data.filter(element => {
                if (typeof (element.type) !== 'undefined') {
                    return element.type.toLowerCase().includes(selectedFilter);
                }
            });
            buildCardsView(filteredData);
        });

        $('#card-race-filter').on('change', async function () {

            $('#search-name').val("")

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-type-filter')[0].selectedIndex = 0;

            $('.form-check-input').prop('checked', false);

            let selectedFilter = $('#card-race-filter :selected').val().toLowerCase();

            let data = await getAllCardsData();
            let filteredData = data.filter(element => {
                if (typeof (element.race) !== 'undefined') {
                    return element.race.toLowerCase().includes(selectedFilter);
                }
            });
            buildCardsView(filteredData);
        });
    }

    var onKeyUpEvent = async function () {

        $('#search-name').on('keyup', async function () {

            $('.form-check-input').prop('checked', false);

            $('#card-class-filter')[0].selectedIndex = 0;
            $('#card-type-filter')[0].selectedIndex = 0;
            $('#card-race-filter')[0].selectedIndex = 0; 

            let value = $(this).val().toLowerCase();

            var getNameInput = async function () {

                let data = await getAllCardsData();

                let filteredData = data.filter(element => {
                    if (typeof (element.name) !== 'undefined'){
                        return element.name.toLowerCase().includes(value);
                    }
                });

                buildCardsView(filteredData);
            }

            setTimeout(getNameInput, 500);

        });
    }




    return {
        init: async function () {
            loadCardsData();
            onClickEvent();
            onChangeEvent();
            onKeyUpEvent();
        }
    };
}();

$(document).ready(function () {
    onInit.init();
});
