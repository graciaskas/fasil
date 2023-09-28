


export default  function adjustScreen() { 
    const windowHeight = window.innerHeight;

    //**-- GET DOM ELEMENTS */
    const appHeader = document.querySelector("#AppHeader");
    const appHeaderPage = document.querySelector("#AppHeaderPage");
    const bodyContainer = document.querySelector("#bodyContainer");
    const actionBar = document.querySelector("#action_bar");
    const mainContainer = document.querySelector("#main_container");


    //**-- GET CLIENT HEIGHTS */
    const  headerHeight = appHeader ? appHeader.clientHeight : 0;
    const  headerPageHeight = appHeaderPage ? appHeaderPage.clientHeight : 0;
    const bodyHeight = bodyContainer ? bodyContainer.clientHeight : 0;
    const actionBarHeight = actionBar ? actionBar.clientHeight : 0;
    const containerHeight = mainContainer ? mainContainer.clientHeight : 0;

    if( mainContainer && bodyContainer)  {
        //**-- DEFINE HEIGHT VALUES */
        const mainH = windowHeight - headerHeight - headerPageHeight - actionBarHeight - 5;
        const bodyH = windowHeight - headerHeight - headerPageHeight - 50;

        //**-- SET HEIGHTS */
        mainContainer.style.height = mainH + "px";
        bodyContainer.style.height = bodyH + "px";

        mainContainer.style.overflowY = "scroll";
    }

    console.log(mainContainer);

};