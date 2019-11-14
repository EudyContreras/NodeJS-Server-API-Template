
function setupSidebar() {

   const sidebarState = {
      opened: true
   };

   const closeStateProps = {

   }

   function assignListeners() {
     $('#sidebar-toggle').click(e => {
         if (sidebarState.opened) {
            closeSidebar();
         } else {
            openSidebar();
         }
     });
   }
   
   function closeSidebar() {
      sidebarState.opened = false;
      $('.side-menu').addClass('closed');
   }
   
   function openSidebar() {
      sidebarState.opened = true;
      $('.side-menu').removeClass('closed');
   }

   assignListeners();
}
