import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import { withRouter, Redirect, Link, useLocation } from 'react-router-dom';


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

type SearchActive = boolean

const SearchComponent = ({ location, ...restprops }: RouteProps) => {

    // const [Searching, setsearchStatus] = useState<SearchActive>(false)
  const [searchReq, setsearchReq] = useState<SearchInput>('')
  const [data, setData] = useState<Song[]>([])
//   TO HOLD STATE FOR SEARCH REQ INPUT
// const [data, setData] = useState<Book[]>([])
// USING INTERFACE AS TYPE FOR THE USE STATE TO RECIEVE DATA FROM API

  const handleInput = (value: string, stateProperty: string) => {
    setsearchReq(value as string)
  }
//   ON FORM INPUT SET VALUE AS STRING 

const clearSearch = () => {
    setData([])
    console.log(searchReq)
  }


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(searchReq)

        const fetchData = async () => {
            // let's say we're doing a fetch...
            let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchReq}`)
            let songs = await response.json()
            console.log(songs.data)
            setData(songs.data)
          setsearchReq('')
        //   setsearchStatus(false)
          }
          fetchData()

    

    // const objectToSend = {
    //     searchReq,
    // }
  }

//   useEffect(() => {
//     const fetchData = async () => {
//       // let's say we're doing a fetch...
//       let response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchReq}`)
//       let songs = await response.json()
//       console.log(songs)
//     //   setData(books)
//     setsearchReq('')
//     setsearchStatus(false)
//     }
//     fetchData()
//   }, [Searching])

console.log(data)

  return (
     data.length > 0? 
     <div>
        <ListGroup>
                {
                    data.map((song, idx) => {
                        return (
                        <ListGroup.Item key={idx}>
                            <Card style={{ width: '18rem' }} className="text-dark">
                                <Card.Body>
                                    <Card.Title>{song.title}</Card.Title>
                                    <Card.Subtitle>{song.title}</Card.Subtitle>
                                    <Card.Text>
                                    {song.album.title}
                                    </Card.Text>
                                    <Button variant="primary">
                                        <Link className="py-3 my-4" to={`/Detail?trackid=${song.id}`} >See More</Link>
                                    </Button>
                                </Card.Body>
                                </Card>
                        </ListGroup.Item>)
                    })
                }
            
        </ListGroup>
        <Button onClick={clearSearch}>
            <FontAwesomeIcon icon={faRecycle}/>
        </Button>
        </div>

        : <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Search Music Database...</Form.Label>
        <Form.Control
          type="text"
          placeholder="Start typing here..."
          value={searchReq}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e.target.value, 'search')}
        />
      </Form.Group>
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default SearchComponent
