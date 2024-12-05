let channels= [
    {
        "creator": "1939745a8048c8a91fac634a759",
        "title": "Mathematik",
        "cards": []
    },
    {
        "creator": "1939745a8048c8a91fac634a759",
        "title": "Englisch",
        "cards": []
    },
    {
        "creator": "1939745a8048c8a91fac634a759",
        "title": "Französisch",
        "cards": []
    },
];
function initDashboard() {
    loadTest()
};

function loadTest() {   
    let language = document.getElementById("languages");

    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i].title;
        language.innerHTML += loadLanguage(channel);
    }
    
    
}