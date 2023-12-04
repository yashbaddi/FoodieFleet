import { approveRequest, logoutRequest, rejectRequest } from "../requests.js";
import { login } from "./login.js";

export function consentPage(root) {
  root.innerHTML = "";
  const showData = document.createElement("div");
  const dataHeader = document.createElement("h1");
  dataHeader.textContent = "do you wish to consent?";
  const consentBtn = document.createElement("button");
  const rejectBtn = document.createElement("button");

  const logOutBtn = document.createElement("button");

  consentBtn.textContent = "Approve";
  rejectBtn.textContent = "Reject";
  logOutBtn.textContent = "LogOut Button";

  showData.className = "display show-data";
  dataHeader.className = "header show-data__header";
  consentBtn.className = "btn show-data__consent";
  rejectBtn.className = "btn show-data__reject ";
  logOutBtn.className = "btn show-data__logout";

  showData.append(dataHeader, consentBtn, rejectBtn, logOutBtn);
  root.append(showData);
  consentBtn.addEventListener("click", (e) => {
    approveRequest();
  });
  rejectBtn.addEventListener("click", (e) => {
    rejectRequest();
  });

  logOutBtn.addEventListener("click", (e) => {
    logoutRequest().then((res) => {
      login(root);
    });
  });
}
