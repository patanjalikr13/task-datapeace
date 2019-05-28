
export default (state, action) => {
    if(action.type === 'ajaxResponse'){
        let dataBackup = [...action.data];

         let compare =( a, b ) => {
            if ( a.first_name < b.first_name ){
                return -1;
            }
            if ( a.first_name > b.first_name ){
                return 1;
            }
            return 0;
        }

        dataBackup.sort( compare );

        let dataToShow = dataBackup.splice(0, 5);
        let page = 1;

        let currentPagingStart = 1;
        let currentPagingEnd = 10;


        let totalPage = 0;
        if(action.data.length%5 === 0)
            totalPage = parseInt(action.data.length/5);
        else
            totalPage = parseInt(action.data.length/5)+1;
        totalPage -= 1;
        return {
            ...state,
            page: page,
            totalPage: totalPage,
            currentPagingEnd: currentPagingEnd,
            currentPagingStart: currentPagingStart,
            allUsers: action.data,
            dataToShow: dataToShow,
            backUpAllusers: action.data,
            currentSorted: "first_name"
        }
    }

    if(action.type === "goToPrev"){

        let currentPagingStart = 1;
        if((state.currentPagingStart-10)<0)
            currentPagingStart = 1;
        else
            currentPagingStart = state.currentPagingStart-10;

        let currentPagingEnd = 10;
        if((state.currentPagingEnd-10)<10)
            currentPagingEnd = 10;
        else
            currentPagingEnd = state.currentPagingEnd-10;

        return {
                ...state,
                currentPagingStart: currentPagingStart,
                currentPagingEnd: currentPagingEnd
            }
        }

    if(action.type === "goToNext") {

        let currentPagingStart = state.totalPage-10;
        if((state.currentPagingStart+10)>state.totalPage)
            currentPagingStart = state.totalPage-10;
        else
            currentPagingStart = state.currentPagingStart+10;

        let currentPagingEnd = state.totalPage;
        if((state.currentPagingEnd+10)>state.totalPage)
            currentPagingEnd = state.totalPage;
        else
            currentPagingEnd = state.currentPagingEnd+10;


            return {
                ...state,
                currentPagingStart: currentPagingStart,
                currentPagingEnd: currentPagingEnd
        }
    }


    if(action.type === "changePage"){
        let page = action.pageNum;
        if(action.pageNum <= state.totalPage){
            let showTill = ((action.pageNum*5)-5);
            let allUsers = [...state.allUsers];
            let showData = allUsers.splice(showTill, 5);
            return {
                ...state,
                page: page,
                dataToShow: showData
            }
        }
    }




    if(action.type === "prevPage"){
        if(state.page !==1) {
            if (((state.page - 1) > 0) && (state.page - 1) <= state.currentPagingEnd && (state.page - 1) >= state.currentPagingStart)
            {
                let page = state.page -1 ;
                if (page <= state.totalPage) {
                let showTill = ((page * 5) - 5);
                let allUsers = [...state.allUsers];
                let showData = allUsers.splice(showTill, 5);

                return {
                    ...state,
                    page: page,
                    dataToShow: showData,
                }
            }
        }

            else
            {


                let currentPagingStart = 1;
                if((state.currentPagingStart-10)<0)
                    currentPagingStart = 1;
                else
                    currentPagingStart = state.currentPagingStart-10;

                let currentPagingEnd = 10;
                if((state.currentPagingEnd-10)<10)
                    currentPagingEnd = 10;
                else
                    currentPagingEnd = state.currentPagingEnd-10;


                let page = state.page - 1;
                if(page <= state.totalPage){
                    let showTill = ((page*5)-5);
                    let allUsers = [...state.allUsers];
                    let showData = allUsers.splice(showTill, 5);
                    return {
                        ...state,
                        page: page,
                        dataToShow: showData,
                        currentPagingStart: currentPagingStart,
                        currentPagingEnd: currentPagingEnd
                    }
                }

            }
        }
    }

    if(action.type === "nextPage"){
        if(state.page !== state.totalPage) {
            if( (state.page+1<=state.totalPage) && (state.page+1)<=state.currentPagingEnd && (state.page+1) >= state.currentPagingStart )
            {
                let page = state.page + 1;
                if(page <= state.totalPage){
                    let showTill = ((page*5)-5);
                    let allUsers = [...state.allUsers];
                    let showData = allUsers.splice(showTill, 5);

                    return {
                        ...state,
                        page: page,
                        dataToShow: showData,
                    }
                }
            }
            else
            {
                let currentPagingStart = state.totalPage-10;
                if((state.currentPagingStart+10)>state.totalPage)
                    currentPagingStart = state.totalPage-10;
                else
                    currentPagingStart = state.currentPagingStart+10;

                let currentPagingEnd = state.totalPage;
                if((state.currentPagingEnd+10)>state.totalPage)
                    currentPagingEnd = state.totalPage;
                else
                    currentPagingEnd = state.currentPagingEnd+10;

                let page = state.page + 1;
                if(page <= state.totalPage){
                    let showTill = ((page*5)-5);
                    let allUsers = [...state.allUsers];
                    let showData = allUsers.splice(showTill, 5);

                    return {
                        ...state,
                        page: page,
                        dataToShow: showData,
                        currentPagingStart: currentPagingStart,
                        currentPagingEnd: currentPagingEnd

                    }
                }


            }
        }
    }


    if(action.type === "search_update"){
        let input_value = action.inpValue;
        if(input_value.length === 0){

            state.allUsers = [...state.backUpAllusers];
            let dataToShow = [...state.backUpAllusers].splice(0, 5);
            let page = 1;

            let currentPagingStart = 1;
            let currentPagingEnd = 10;

            //console.log("here",state.allUsers);

            let totalPage = 0;
            if(state.allUsers.length%5 === 0)
                totalPage = parseInt(state.allUsers.length/5);
            else
                totalPage = parseInt(state.allUsers.length/5)+1;
            totalPage -= 1;
            if(currentPagingEnd>totalPage)
                currentPagingEnd = totalPage;
            return {
                ...state,
                page: page,
                totalPage: totalPage,
                currentPagingEnd: currentPagingEnd,
                currentPagingStart: currentPagingStart,
                dataToShow: dataToShow,
                allUsers: state.backUpAllusers,
            }

        }



        let newAllUsers = [];
        state.backUpAllusers.map(
            (v,i) => {
//                console.log();
                if((v.first_name.toLowerCase().indexOf(input_value.toLowerCase()) === 0 ))
                {
                    newAllUsers.push(v);
                }
            }
        )

        //console.log(newAllUsers);

        let dataToShow = [...newAllUsers].splice(0, 5);
        let page = 1;

        let currentPagingStart = 1;
        let currentPagingEnd = 10;


        let totalPage = 0;
        if(newAllUsers.length%5 === 0)
            totalPage = parseInt(newAllUsers.length/5);
        else
            totalPage = parseInt(newAllUsers.length/5)+1;
        totalPage -= 1;
        if(currentPagingEnd>totalPage)
            currentPagingEnd = totalPage;
        return {
            ...state,
            page: page,
            totalPage: totalPage,
            currentPagingEnd: currentPagingEnd,
            currentPagingStart: currentPagingStart,
            allUsers: newAllUsers,
            dataToShow: dataToShow
        }
    }

    if(action.type==="sort"){
        let key = action.key;
        let compare = ( a, b ) => {
            if ( a[key] < b[key] ){
                return -1;
            }
            if ( a[key] > b[key] ){
                return 1;
            }
            return 0;
        }

        state.allUsers.sort(compare);
        let dataToShow = [...state.allUsers].splice(0, 5);
        let page = 1;

        let currentPagingStart = 1;
        let currentPagingEnd = 10;

        //console.log("here",state.allUsers);

        let totalPage = 0;
        if(state.allUsers.length%5 === 0)
            totalPage = parseInt(state.allUsers.length/5);
        else
            totalPage = parseInt(state.allUsers.length/5)+1;
        totalPage -= 1;
        if(currentPagingEnd>totalPage)
            currentPagingEnd = totalPage;
        return {
            ...state,
            page: page,
            totalPage: totalPage,
            currentPagingEnd: currentPagingEnd,
            currentPagingStart: currentPagingStart,
            dataToShow: dataToShow,
            allUsers: state.allUsers,
            currentSorted: key
        }

    }

    return state;
}