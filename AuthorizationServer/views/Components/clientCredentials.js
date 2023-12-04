export function clientCredentials(root, credentials) {
  root.innerHTML = "";
  const clientCredDiv = document.createElement("div");
  const clientID = document.createElement("p");
  const clientSecretKey = document.createElement("p");

  clientID.innerText = "Your Client ID is " + credentials.id;
  clientSecretKey.innerText = "Your Client Secret is " + credentials.secret;

  clientCredDiv.append(clientID, clientSecretKey);

  root.append(clientCredDiv);
}
