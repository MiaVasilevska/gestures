
  //install service worker
  self.addEventListener("install",(installing)=>{
    console.log("Service Worker: Installed");
  });
  
  //activate service worker
  self.addEventListener("activate",(activating)=>{	
    console.log("Service Worker: Activated");
  });
  
  self.addEventListener("fetch",(fetching)=>{   
    console.log("Service Worker: Fetch");
  });
  
  self.addEventListener("push",(pushing)=>{
      console.log("Service Worker: Received push data");
  })
  