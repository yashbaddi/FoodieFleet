import sessionModel from "../model/sessions";

const sessionService = {
  createSession: createSession,
};

async function createSession(userID) {
  const sessionDetails = await sessionModel.createSession(userID);
  return sessionDetails;
}

export default sessionService;
