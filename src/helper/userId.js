
export function getId( sub) {
    let id = sub.split('|')[1];
    while(id.length < 24) {
      id = '0' + id;
    }
    return id;
  }