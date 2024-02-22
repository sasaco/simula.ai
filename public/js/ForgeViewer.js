var viewer;
var modelUrn;
var sourceNode;

var lbmainlabel = document.getElementById("lbmainlabel");
var btconfig = document.getElementById("btconfig");
var isvisible = true;

function launchViewer(urn) {
    var options = {
      env: 'AutodeskProduction',
      getAccessToken: getForgeToken
    };
  
    Autodesk.Viewing.Initializer(options, () => {
      viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['Autodesk.DocumentBrowser','HandleSelectionExtension'] });
      viewer.start();
      var documentId = 'urn:' + urn;
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
  }
  
  function onDocumentLoadSuccess(doc) {
    var viewables = doc.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(doc, viewables).then(i => {
      // documented loaded, any action?
    });
  }
  
  function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode + '\n- errorMessage:' + viewerErrorMsg);
  }
  
  function getForgeToken(callback) {
    fetch('/api/forge/oauth/token').then(res => {
      res.json().then(data => {
        callback(data.access_token, data.expires_in);
      });
    });
  }
  
  function getAllLeafComponents(callback) {
    console.log("Is Running");
    viewer.getObjectTree(function (tree) {
      var leaves = [];
      tree.enumNodeChildren(tree.getRootId(), function (dbId) {
        leaves.push(dbId);
        console.log("Testing"+dbId);
        console.log(leaves);
      }, true);
      callback(leaves);
    });
  }
  