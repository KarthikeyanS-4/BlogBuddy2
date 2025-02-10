import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThumbsUp, ArrowLeft } from 'lucide-react';
import axios from '../axios/axios';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      const likes = blog.likes + 1;
      
      const data = {
        "likes": likes
      }
      await axios.put(`/like/${id}`, data);


      setBlog(prevBlog => ({ ...prevBlog, likes: likes }));
    } catch (error) {
      console.error("Error incrementing likes:", error);
    }
  };


  const handleEdit = () => {
    navigate(`/editblog/${id}`);
  };

  if (!blog) {
    return <div className="p-5 text-2xl w-full text-center">Blog not found.</div>;
  }

  return (
    <div className='p-3 container mt-2 mx-auto'>
      <Link to="/" className='flex items-center p-2 w-fit border border-stone-500 rounded-xl hover:rotate-3 transition delay-75 duration-300 ease-in-out'>
        <ArrowLeft size={20} />
        <h1 className='text-xl'>Back</h1>
      </Link >
      <div className='max-w-4xl mx-auto'>
        {blog.url && <img src={blog.url} alt="Blog" className='w-full max-h-96 object-contain mb-6' />}
        <h1 className='font-bold text-3xl text-center mb-5 text-gray-500 uppercase underline'>{blog.title}</h1>
        <p className='text-gray-600 mb-4 italic'>By {blog.author_name}</p>
        <div className='prose max-w-none'>
          <p className='whitespace-pre-wrap'>{blog.content}</p>
        </div>
        <button onClick={handleEdit} className='mt-2 py-2 px-4 bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-800'>Edit</button>
        <div className='mt-6 flex gap-4 text-gray-500 select-none'>
          <span onClick={handleLike} className='flex items-center cursor-pointer text-center gap-2'><ThumbsUp className='hover:text-red-900' size={20} /> {blog.likes} likes</span>
        </div>
      </div>
    </div >
  );
}

export default BlogDetail;