import React, { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage';
import CommentList from '../components/CommentList';
import UpvoteSection from '../components/UpvoteSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(
        '🚀 ~ file: ArticlePage.js ~ line 16 ~ fetchData ~ body',
        body
      );
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  if (!article) {
    return <NotFoundPage />;
  }

  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <h1>{article.title}</h1>
      <UpvoteSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={setArticleInfo}
      />
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h3>Other Articles:</h3>
      <ArticleList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
