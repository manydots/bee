import Tools from 'utils/index';
const linkConfig = {
    //本地localhost或127.0.0.1环境下的路径设置
    local: {
        'index': '/demos/index.html',
        'index-index': '/demos/index.html#/index',

        'marketing': '/demos/marketing.html',
        'marketing-index': '/demos/marketing.html#/index',

        'member': '/demos/member.html',
        'member-index': '/demos/member.html#/index',

        'shop': '/demos/vshop.html',
        'shop-index': '/demos/vshop.html#/index',
        'shop-shopVisit': '/demos/vshop.html#/shopVisit',
        'shop-card': '/demos/vshop.html#/card',
        'shop-cardVisit': '/demos/vshop.html#/cardVisit',
        'shop-marketings': '/demos/vshop.html#/marketings',
        'shop-list': '/demos/vshop.html#/list',

        'care-index': '/demos/care.html#/index',
        'care-OnePressPay': '/demos/care.html#/OnePressPay',
        'care-TwoPressPay': '/demos/care.html#/TwoPressPay',
        'care-TaobaoPressPay': '/demos/care.html#/TaobaoPressPay',
        'care-Manual': '/demos/care.html#/Manual',
        'care-Pay': '/demos/care.html#/Pay',
        'care-Delivery': '/demos/care.html#/Delivery',
        'care-Late': '/demos/care.html#/Late',
        'care-Abnormal': '/demos/care.html#/Abnormal',
        'care-Tocity': '/demos/care.html#/Tocity',
        'care-Signed': '/demos/care.html#/Signed',

        'care-BuyerRefundCreated': '/demos/care.html#/BuyerRefundCreated',
        'care-SellerAgreeRefund': '/demos/care.html#/SellerAgreeRefund',
        'care-SellerUnagreeRefund': '/demos/care.html#/SellerUnagreeRefund',
        'care-BuyerToGoods': '/demos/care.html#/BuyerToGoods',
        'care-DistanceRefund': '/demos/care.html#/DistanceRefund',

        'care-Pushreviews': '/demos/care.html#/Pushreviews',
        'care-Evaluation': '/demos/care.html#/Evaluation',
        'care-BadReview': '/demos/care.html#/BadReview',
        'care-MsgRecord': '/demos/care.html#/MsgRecord',

        'member-UpDateOut': '/demos/member.html#/UpDateOut',

        'member-All': '/demos/member.html#/All',
        'member-Faithful': '/demos/member.html#/Faithful',
        'member-CreditUsers': '/demos/member.html#/CreditUsers',
        'member-NewUsers': '/demos/member.html#/NewUsers',
        'member-PotentialUsers': '/demos/member.html#/PotentialUsers',
        'member-SilenceOldUsers': '/demos/member.html#/SilenceOldUsers',
        'member-BlackList': '/demos/member.html#/BlackList',
        'member-Custom': '/demos/member.html#/Custom',
        'member-NewGroup': '/demos/member.html#/NewGroup',
        'member-Search': '/demos/member.html#/Search',

        'marketing-list': '/demos/marketing.html#/list',
        'marketing-msgRecord': '/demos/marketing.html#/msgRecord',
        'marketing-record': '/demos/marketing.html#/record',
        'marketing-trade': '/demos/marketing.html#/trade',
        

        'index-manualCf':'/demos/index.html#/manualCf',
        'index-marketing': '/demos/index.html#/marketing',

        'index-marketing-list': '/demos/index.html#/marketing/list',
        'index-marketing-list': '/demos/index.html#/marketing/list',
        'index-member': '/demos/index.html#/member',
        'index-integral':'/demos/index.html#/integral',
        'index-review':'/demos/index.html#/review',
        'index-log':'/demos/index.html#/log',
        'index-message':'/demos/index.html#/message',
        'index-pay':'/demos/index.html#/pay',
        'index-account':'/demos/index.html#/account',
        'index-vshop':'/demos/index.html#/vshop',
        'index-recharge':'/demos/index.html#/recharge',
        'index-orderList':'/demos/index.html#/orderList',

    },
    onLine: {
        //自行根据服务端路径定义



        'index': 'QnIndex.h4',
        'index-index': 'QnIndex.h4#/index',

        'marketing': 'QnMarketing.h4',
        'marketing-index': 'QnMarketing.h4#/index',

        'member': 'QnMember.h4',
        'member-index': 'QnMember.h4#/index',

        'shop': 'QnVshop.h4',
        'shop-index': 'QnVshop.h4#/index',
        'shop-shopVisit': 'QnVshop.h4#/shopVisit',
        'shop-card': 'QnVshop.h4#/card',
        'shop-cardVisit': 'QnVshop.h4#/cardVisit',
        'shop-marketings': 'QnVshop.h4#/marketings',
        'shop-list': 'QnVshop.h4#/list',

        'care-index': 'QnCare.h4#/index',
        'care-OnePressPay': 'QnCare.h4#/OnePressPay',
        'care-TwoPressPay': 'QnCare.h4#/TwoPressPay',
        'care-TaobaoPressPay': 'QnCare.h4#/TaobaoPressPay',
        'care-Manual': 'QnCare.h4#/Manual',
        'care-Pay': 'QnCare.h4#/Pay',
        'care-Delivery': 'QnCare.h4#/Delivery',
        'care-Late': 'QnCare.h4#/Late',
        'care-Abnormal': 'QnCare.h4#/Abnormal',
        'care-Tocity': 'QnCare.h4#/Tocity',
        'care-Signed': 'QnCare.h4#/Signed',

        'care-BuyerRefundCreated': 'QnCare.h4#/BuyerRefundCreated',
        'care-SellerAgreeRefund': 'QnCare.h4#/SellerAgreeRefund',
        'care-SellerUnagreeRefund': 'QnCare.h4#/SellerUnagreeRefund',
        'care-BuyerToGoods': 'QnCare.h4#/BuyerToGoods',
        'care-DistanceRefund': 'QnCare.h4#/DistanceRefund',

        'care-Pushreviews': 'QnCare.h4#/Pushreviews',
        'care-Evaluation': 'QnCare.h4#/Evaluation',
        'care-BadReview': 'QnCare.h4#/BadReview',
        'care-MsgRecord': 'QnCare.h4#/MsgRecord',

        'member-UpDateOut': 'QnMember.h4#/UpDateOut',

        'member-All': 'QnMember.h4#/All',
        'member-Faithful': 'QnMember.h4#/Faithful',
        'member-CreditUsers': 'QnMember.h4#/CreditUsers',
        'member-NewUsers': 'QnMember.h4#/NewUsers',
        'member-PotentialUsers': 'QnMember.h4#/PotentialUsers',
        'member-SilenceOldUsers': 'QnMember.h4#/SilenceOldUsers',
        'member-BlackList': 'QnMember.h4#/BlackList',
        'member-Custom': 'QnMember.h4#/Custom',
        'member-NewGroup': 'QnMember.h4#/NewGroup',
        'member-Search': 'QnMember.h4#/Search',

        'marketing-list': 'QnMarketing.h4#/list',
        'marketing-msgRecord': 'QnMarketing.h4#/msgRecord',
        'marketing-record': 'QnMarketing.h4#/record',
        'marketing-trade': 'QnMarketing.h4#/trade',
        

        'index-manualCf':'QnIndex.h4#/manualCf',
        'index-marketing': 'QnIndex.h4#/marketing',

        'index-marketing-list': 'QnIndex.h4#/marketing/list',
        'index-marketing-list': 'QnIndex.h4#/marketing/list',
        'index-member': 'QnIndex.h4#/member',
        'index-integral':'QnIndex.h4#/integral',
        'index-review':'QnIndex.h4#/review',
        'index-log':'QnIndex.h4#/log',
        'index-message':'QnIndex.h4#/message',
        'index-pay':'QnIndex.h4#/pay',
        'index-account':'QnIndex.h4#/account',
        'index-vshop':'QnIndex.h4#/vshop',
        'index-recharge':'QnIndex.h4#/recharge',
        'index-orderList':'QnIndex.h4#/orderList',

    }
}

const links = Tools.isLocal() ? linkConfig.local : linkConfig.onLine;
export default links;