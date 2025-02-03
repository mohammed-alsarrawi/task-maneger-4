import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { ref, push, set, onValue, update, remove } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, Edit2, Trash2, MessageSquare, Heart } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

function Articles() {
  const { user } = useAuth();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [comment, setComment] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Fetch articles
  useEffect(() => {
    const articlesRef = ref(db, "articles");
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const articlesArray = Object.keys(data).map((key) => ({ // convert data to array having keys
          id: key,
          ...data[key], // the result is array having all articles instead of json
        }));
        setArticles(
          articlesArray.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // if plus dont replace if minus replace so the result article from newest
          )
        );
      } else {
        setArticles([]);
      }
      setIsLoading(false);
    });
  }, []);

  // Handle article submission
  const handleSubmit = async () => {
    if (!user) return alert("You must be logged in to submit an article.");

    if (articleTitle.trim() && articleContent.trim()) {
      try {
        const newArticle = {
          title: articleTitle,
          content: articleContent,
          authorId: user.uid,
          authorName: user.displayName || user.email,
          createdAt: new Date().toISOString(),
          comments: {},
          tags: tags,
          likes: {},
        };
        const articlesRef = ref(db, "articles");
        if (editingArticleId) {
          await update(ref(db, `articles/${editingArticleId}`), newArticle);
          setEditingArticleId(null);
        } else {
          await push(articlesRef, newArticle);
        }
        setArticleTitle("");
        setArticleContent("");
        setTags([]);
        setIsWriting(false);
      } catch (error) {
        console.error("Error submitting article:", error);
        alert("An error occurred while submitting the article.");
      }
    }
  };

  // Handle article like
  const handleLike = (articleId) => {
    if (!user) return alert("You must be logged in to like an article.");
    const articleRef = ref(db, `articles/${articleId}`);
    update(articleRef, {
      likes: {
        [user.uid]: true,
      },
    });
  };

  // Pagination logic
  const paginatedArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Rich text editor modules (without toolbar)
  const modules = {
    toolbar: false, // Disable toolbar
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Article Hub
          </h1>
          {user && !isWriting && (
            <button
              onClick={() => setIsWriting(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5" />
              Write Article
            </button>
          )}
        </div>

        {user && isWriting && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingArticleId ? "Edit Article" : "Create New Article"}
            </h2>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your article title..."
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
            />
            <ReactQuill
              value={articleContent}
              onChange={setArticleContent}
              modules={modules}
              formats={formats}
              placeholder="Write your article content..."
              className="mb-6"
            />
            <input
              type="text"
              placeholder="Add tags (comma separated)..."
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(","))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="flex gap-3">
              <button
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                onClick={handleSubmit}
              >
                {editingArticleId ? "Update Article" : "Publish Article"}
              </button>
              <button
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                onClick={() => {
                  setIsWriting(false);
                  setArticleTitle("");
                  setArticleContent("");
                  setTags([]);
                  setEditingArticleId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {paginatedArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link
                      to={`/profile/${article.authorId}`}
                      className="font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {article.authorName}
                    </Link>
                    <span>•</span>
                    <time>
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div
                    className="text-gray-700 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  {article.tags && (
                    <div className="flex gap-2 mb-6">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {user && article.authorId === user.uid && (
                    <div className="flex gap-3 mb-6">
                      <button
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        onClick={() => {
                          setArticleTitle(article.title);
                          setArticleContent(article.content);
                          setTags(article.tags || []);
                          setEditingArticleId(article.id);
                          setIsWriting(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                        onClick={() =>
                          remove(ref(db, `articles/${article.id}`))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-6">
                    <button
                      onClick={() => handleLike(article.id)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <Heart className="w-4 h-4" />
                      {article.likes
                        ? Object.keys(article.likes).length
                        : 0}{" "}
                      Likes
                    </button>
                  </div>
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                      Comments
                    </h4>
                    {user && (
                      <div className="mb-6">
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Add a comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                          onClick={() => {
                            if (comment.trim()) {
                              push(ref(db, `articles/${article.id}/comments`), {
                                text: comment,
                                authorId: user.uid,
                                authorName: user.displayName || user.email,
                                createdAt: new Date().toISOString(),
                              });
                              setComment("");
                            }
                          }}
                        >
                          Post Comment
                        </button>
                      </div>
                    )}
                    <div className="space-y-4">
                      {article.comments &&
                        Object.entries(article.comments).map(
                          ([id, comment]) => (
                            <div key={id} className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-700 mb-2">
                                {comment.text}
                              </p>
                              <div className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {comment.authorName}
                                </span>
                                <span className="mx-2">•</span>
                                <time>
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </time>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage * articlesPerPage >= articles.length}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
