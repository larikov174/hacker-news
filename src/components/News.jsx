// import styled from 'styled-components';
import useFetch from '../hooks/useFetch';

const News = () => {
	const {posts, loading, error} = useFetch();
  if (loading) return <div>Loading...</div>;
	if (error) return <div>Error occurred, try again later...</div>


	return (
    <div>
      <h1>HackerNews Top 10 Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
	);
};

export default News;