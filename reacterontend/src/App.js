import { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/navbar/Navbar';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';

function App() {
  const [feedback, setFeedBackData] = useState();
  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} />
      </div>
    </>
  );
}

export default App;
