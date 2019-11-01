import queryString from 'query-string'

export default function( src ){

  const url = new URL(decodeURIComponent(src))
  const params = queryString.parse(url.search)
  const regex = params.href.match(/(videos|story_fbid)(\/|=)(\d+)(\/|&)?/)
  let id = regex[3]
  // console.log(params)
  // console.log(regex)
  if( id ){
    return id
  }else{
    return null
  }
}