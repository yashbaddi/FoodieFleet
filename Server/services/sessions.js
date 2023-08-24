import sessionModel from "../model/sessions";

const sessionService = {
  createSession: createSession,
  readSession: readSession,
};

async function createSession(userID) {
  const sessionDetails = await sessionModel.createSession(userID);
  return sessionDetails;
}

async function readSession(sessionID) {
  const sessionDetails = await sessionModel.readSession(sessionID);
  return sessionDetails;
}

async function deleteSession() {
  const sessionDetails = await sessionModel.deleteSession(sessionID);
}
export default sessionService;
