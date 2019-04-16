import React, { Component } from 'react';
import './App.css';
import MovieItem from './MovieItem'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import ReactPlayer from 'react-player'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {

      isLoading: false,
      isError: '',
      results: [],
      searchText: '',
      modal: false,
    };

    
    this.handleChange = this.handleChange.bind(this);
    this.searchAction = this.searchAction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.openLink = this.openLink.bind(this);
    this.toggle = this.toggle.bind(this);

    this.currentItem = null;
    this.playUrl = ''

  }

  componentDidMount(){
    this.requestMoviesList()
  }

  requestMoviesList = async () => {

    if (this.state.searchText === ''){
      return
    }

    this.setState({ isLoading: true });

    const url = `http://movies.hdviet.com/tim-kiem-nhanh.html?keyword=${this.state.searchText}`
    
    console.log(url)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('res:', data.Title);

        this.setState({
            isLoading: false,
            isError: '',
            results: data.Title
        });

      })
      .catch(error => {
        console.log(error);
        this.setState({
              isLoading: false,
              isError: error
            });
      });
  };

  getPlayUrl = async () => {


    const url = `http://movies.hdviet.com/get_movie_play_json?movieid=${this.currentItem.MovieID}&sequence=1`
    
    console.log(url)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('res:', data);
        this.playUrl = data.data.playList
        this.setState({
          modal:true
        });

      })
      .catch(error => {
        console.log(error);
        this.setState({
              isLoading: false,
              isError: error
            });
      });
  };


  onClickItem(item){
    console.log(item.MovieID)
    this.currentItem = item
    this.getPlayUrl()
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  openLink(){
    var win = window.open(this.currentItem.Link, '_blank');
     win.focus();
  }

  handleChange(event) {
    this.setState({searchText: event.target.value});
  }

  handleSubmit(event) {
    console.log("value", event.target.value)
    console.log(this.state.value)
    this.requestMoviesList();
    event.preventDefault();
  }

  searchAction(event) {
    this.requestMoviesList();
  }


  render() {


    
    return (
      <div className="App">
        <header className="App-header">
          
          <div style={{marginTop:20, marginBottom: 10}}>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange} style={{marginRight: 10, height: 38}} />
            <Button color="info" onClick={this.searchAction} style={{marginBottom:10}}>Search</Button>
          </form>
            
          </div>
        </header>

        <div className="spinerClass" >
          {this.state.isLoading && 
            <Spinner color="primary" />
          }
        </div>
        

        <div className="App-body">
            {
              Object.keys(this.state.results).map(key => 
                <MovieItem key={key} item={this.state.results[key]} onClick={()=> this.onClickItem(this.state.results[key])}/>
              )
            }
          </div>
          {this.currentItem &&
            

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >

            <ModalHeader color={{backgroundColor:'black'}} toggle={this.toggle}> {this.currentItem.MovieName} </ModalHeader>
            <ModalBody style={{backgroundColor:'black'}}>
            <ReactPlayer url={this.playUrl} width={468}  playing controls/>
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={this.openLink}>Open Link</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>

          </Modal>
          
          }


      </div>
    );
  }
}

