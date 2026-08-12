
export const homeRooms = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/homerooms`)

    const rooms=  await res.json();

    return rooms;
}

export const allRooms = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms`)
    const rooms = await res.json()

    return rooms
}

export const singleRoom = async(id,token)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allrooms/${id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    const room = await res.json()

    return room
}