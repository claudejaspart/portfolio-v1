var selectedMenuItem = "about";
var whitePrimary = "#d8dfee";
var whiteSecondary = "#94A4B8"
var singleton = true;
var set = true;
var unset = false;

function docReady(fn) 
{
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        document.removeEventListener("DOMContentLoaded");
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}  

docReady(()=> 
{
    if (singleton)
    {
        menuItem(selectedMenuItem, set);
        Array.prototype.filter.call(document.getElementsByClassName('item'), 
        (element)=>
        {
            element.addEventListener('mouseover',  highlightItem);
            element.addEventListener('mouseleave', downlightItem);
            element.addEventListener('click', selectItem);
        });
    }
    singleton = false;
});


function menuItem(item, set)
{    
    let menuItem = document.getElementsByClassName(item)[0];
    let menuItemBar = menuItem.childNodes[1];
    set ? selectedItemStyle(menuItem, menuItemBar) : unselectedItemStyle(menuItem, menuItemBar);
}

function highlightItem(evt)
{
    if (evt.target.className !== `item ${selectedMenuItem}`)
    {
        let menuItemBar = evt.target.querySelector('span.bar');
        // selection
        if (menuItemBar != null)
            selectedItemStyle(evt.target, menuItemBar);
    }
}

function downlightItem(evt)
{
    if (evt.target.className !== `item ${selectedMenuItem}`)
    {
        let menuItemBar = evt.target.querySelector('span.bar');
        // deselection
        if (menuItemBar != null)
         unselectedItemStyle(evt.target, menuItemBar);
    }
}

function selectItem(evt)
{
    // stick the style
    let newSelectedMenuItem = evt.target.className.replace("item ", "");
    if (selectedMenuItem !== newSelectedMenuItem)
    {
            menuItem(selectedMenuItem, unset);
            menuItem(newSelectedMenuItem, set);
            selectedMenuItem = newSelectedMenuItem;
    }

    // scroll to content
    let contentElement = document.getElementsByClassName(`desc ${selectedMenuItem}`)[0];
    contentElement.scrollIntoView(true);
}

function selectedItemStyle(menuItem, menuItemBar)
{
    menuItemBar.style.borderWidth = "2px";
    menuItemBar.style.borderTopColor = whitePrimary;
    menuItem.style.color = whitePrimary;
    gsap.to(menuItemBar, {width: '70px', duration: .5});
}

function unselectedItemStyle(menuItem, menuItemBar)
{
    menuItemBar.style.borderWidth = "1px";
    menuItemBar.style.borderTopColor = whiteSecondary;
    menuItem.style.color = whiteSecondary;
    gsap.to(menuItemBar, {width: '40px', duration: .5});
}

