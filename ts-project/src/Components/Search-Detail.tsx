import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import { withRouter, Redirect, Link, useLocation } from 'react-router-dom';
import { type } from 'os'


type RouteProps = RouteComponentProps 
// TO PULL ROUTING INFORMATION FROM PROPS LIKE HISTORY LOCATION ETC

// interface SearchInput {
//     search: string
//   }

interface Song {
    
        id: number
        readable: boolean
        title: string
        title_short: string
        title_version: string
        link: string
        duration: number
        rank: number
        explicit_lyrics: true
        explicit_content_lyrics: number
        explicit_content_cover: number
        preview: string
        md5_image: string
        artist: {
            id: number,
            name: string,
            link: string,
            picture: string,
            picture_small: string,
            picture_medium: string,
            picture_big: string,
            picture_xl: string,
            tracklist: string,
            type: string
        }
        album: {
            id: number,
            title: string,
            cover: string,
            cover_small: string,
            cover_medium: string,
            cover_big: string,
            cover_xl: string,
            md5_image: string,
            tracklist: string,
            type: string
        }
        type: string
  }

type SearchInput = string

type SongID = number



const DetailComponent = ({ location, ...restprops }: RouteProps) => {
  console.log(location)

    // const [Searching, setsearchStatus] = useState<SearchActive>(false)
  const [data, setData] = useState<SearchInput>('')
  const [songDetail, setSong] = useState<Song[]>([])
//   TO HOLD STATE FOR SEARCH REQ INPUT
// const [data, setData] = useState<Book[]>([])
// USING INTERFACE AS TYPE FOR THE USE STATE TO RECIEVE DATA FROM API

  // const handleInput = (value: string, stateProperty: string) => {
  //   setsearchReq(value as string)
  // }
//   ON FORM INPUT SET VALUE AS STRING 

// const clearSearch = () => {
//     setData([])
//     console.log(searchReq)
//   }


  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault()
  //   console.log(searchReq)

  //       const fetchData = async () => {
  //           // let's say we're doing a fetch...
  //           let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchReq}`)
  //           let songs = await response.json()
  //           console.log(songs.data)
  //           setData(songs.data)
  //         setsearchReq('')
  //       //   setsearchStatus(false)
  //         }
  //         fetchData()

    

    // const objectToSend = {
    //     searchReq,
    // }
  // }

  useEffect(() => {
    // let locationUrl = useLocation();

    console.log(location.search)

    // console.log(location.search)
    
    const params = new URLSearchParams(location.search);
    const searchReq = params.get('trackid');
    console.log(searchReq)


    const fetchData = async () => {
      // let's say we're doing a fetch...
      let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/:${searchReq}`)
      let songs = await response.json()
      console.log(songs)
      // let songArr = []
      // songArr.push(songs)
      // setSong(songArr)
    // setsearchReq('')
    }
    fetchData()
  }, [])

console.log(songDetail)

  return (
    
    <div className="jumbotron">
      <h1 className="display-4">Hello, world!</h1>
      <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr className="my-4"/>
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </p>
  </div>
  )
  }

export default DetailComponent
