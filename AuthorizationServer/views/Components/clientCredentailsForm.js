import { generateClientCredentialsRequest } from "../requests.js";
import { clientCredentials } from "./clientCredentials.js";

export function clientCredentialsForm(root) {
  root.innerHTML = "";
  const clientCredentailsFormDiv = document.createElement("div");
  const applicationName = document.createElement("input");
  const redirectURI = document.createElement("input");
  const grantType = document.createElement("input");
  const scope = document.createElement("input");
  const createClientBtn = document.createElement("button");

  applicationName.type = "text";
  applicationName.placeholder = "Application Name";

  redirectURI.type = "text";
  redirectURI.placeholder = "Redirect URI";

  grantType.type = "text";
  grantType.placeholder = "Grant Type";

  scope.type = "text";
  scope.placeholder = "Scope";

  createClientBtn.textContent = "Generate Client";

  clientCredentailsFormDiv.append(
    applicationName,
    redirectURI,
    grantType,
    scope,
    createClientBtn
  );

  createClientBtn.addEventListener("click", (e) => {
    generateClientCredentialsRequest(
      applicationName.value,
      redirectURI.value,
      grantType.value,
      scope.value
    ).then((res) => {
      if (res[0]) {
        clientCredentials(root, res[1]);
      }
    });
  });

  root.append(clientCredentailsFormDiv);
}
