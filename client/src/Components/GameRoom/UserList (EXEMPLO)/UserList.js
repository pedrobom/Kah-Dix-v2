import React from 'react';


const UserList = ( {players} ) => (
  <div className="playersList">
    {players.map((player, i) => <div key={i}><div player={player}/></div>)}
  </div>
);

export default UserList;