const fs = require('fs');

const ARG_CNT = process.argv[2] || 20;

const COMPANIS = [
    {
        "main_phonenumber": "041-564-0001",
        "company_name": "케이티엔114(주)",
        "biz_addr": "충남 천안시 서북구 오성3길 19",
        "categorys": "광고대행,인터넷홈페이지제작 외",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-576-9066",
        "company_name": "서유석의꽃핀한우)",
        "biz_addr": "충남 천안시 서북구 백석로 225 ",
        "categorys": "한우전문",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-621-7333",
        "company_name": "힐링찜질족욕카페",
        "biz_addr": "충남 천안시 서북구 봉정로 273  ",
        "categorys": "발관리",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-621-0218",
        "company_name": "마음을그리다",
        "biz_addr": "충남 천안시 서북구 오성5길 22 ",
        "categorys": "카페 / 미술,공예품",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-569-9939",
        "company_name": "해천참치",
        "biz_addr": "충남 천안시 서북구 오성로 35 ",
        "categorys": "찜요리",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-562-5982",
        "company_name": "59쌀피자 두정점",
        "biz_addr": "충남 천안시 서북구 오성로 31",
        "categorys": "피자",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-558-5559",
        "company_name": "청년국물닭발",
        "biz_addr": "충남 천안시 서북구 두정로 122 ",
        "categorys": "닭발",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-621-9995",
        "company_name": "누나치킨",
        "biz_addr": "충남 천안시 서북구 오성9길 15 ",
        "categorys": "치킨,닭강정",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-567-5666",
        "company_name": "붓다",
        "biz_addr": "충남 천안시 서북구 원두정8길 6 ",
        "categorys": "술집",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-554-3888",
        "company_name": "고향에 봄",
        "biz_addr": "충남 천안시 서북구 두정동 1988 ",
        "categorys": "한정식",
        "situation_name": "광고체결"
    },
    {
        "main_phonenumber": "041-573-1954",
        "company_name": "파콩",
        "biz_addr": "충남 천안시 서북구 오성9길 15 ",
        "categorys": "한식",
        "situation_name": "광고체결"
    }
]

makeMockData(ARG_CNT);

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makeMockData(cnt){
    let data = (new Array(Number(cnt))).fill(1);

    data = data.map(()=>{
        const randomIndex = Math.floor(Math.random() * COMPANIS.length);
        const randomCompany  = {
            ...COMPANIS[randomIndex],
            uuid:makeid(9),
            expired_date: makeTimeStamp(((Math.random()*1000)+1) * ((5 * 60) * 1000)),
            imageQty: Math.floor((Math.random() * 5)),
            docQty: Math.floor((Math.random() * 5)),
            action_dtime:makeTimeStamp(-(((Math.random()*1000)+1) * ((5 * 60) * 1000))),
            force_expire: !!Math.floor((Math.random()*2)),
        }
        return randomCompany;
    })
    
    data.sort((a,b)=>new Date(b.action_dtime) - new Date(a.action_dtime));

    fs.writeFile('MOCK_DATA.json', JSON.stringify(data), function (err) {
        if (err) throw err;
    });

    return  data
}

function makeTimeStamp(adder){
    const now = new Date()
    const expired = now.getTime() + adder
    return (new Date(expired)).toISOString()
}




