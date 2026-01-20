// function to post data
export async function postData(url = "", data = {}) : Promise<Response>{
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response;
}