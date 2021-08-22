/** @format */

import fs from "fs";
import path from "path";

// help us to read markdown file and splitted Mata data and actual markdown content
import matter from "gray-matter";

// current posts directory
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
	// return array of files (array of strings)
	return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
	// (slack) file name without the extension
	const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension

	const filePath = path.join(postsDirectory, `${postSlug}.md`);

	// content of single file
	const fileContent = fs.readFileSync(filePath, "utf-8");

	// gray-matter (return data and content from MD)
	const { data, content } = matter(fileContent);

	const postData = {
		slug: postSlug,
		...data,
		content: content,
	};

	// return data for single post
	return postData;
}

export function getAllPosts() {
	const postFiles = getPostsFiles();

	// map array of post file to array of object data
	const allPosts = postFiles.map((postFile) => {
		return getPostData(postFile);
	});

	// sort all the post (optional)
	const sortedPosts = allPosts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1,
	);

	return sortedPosts;
}

export function getFeaturedPosts() {
	const allPosts = getAllPosts();

	const featuredPosts = allPosts.filter((post) => post.isFeatured);

	// return all the featured post
	return featuredPosts;
}
