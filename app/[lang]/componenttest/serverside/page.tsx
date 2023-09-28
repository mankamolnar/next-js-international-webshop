async function fetchName() {
  return "Pisti";
}

export default async function Page(props : any) {

  const name = await fetchName();
  
  return <div>{name}</div>
}
