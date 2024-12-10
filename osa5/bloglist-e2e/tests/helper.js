const loginWith = async (page, username, password) => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByTestId('blogFormTitleInput').fill(title)
  await page.getByTestId('blogFormAuthorInput').fill(author)
  await page.getByTestId('blogFormUrlInput').fill(url)
  await page.getByTestId('blogFormSubmitButton').click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const createBlogWithLikes = async (page, title, author, url, likes) => {
  await createBlog(page, title, author, url)

  const blogDiv = await page.getByText(`${title} ${author}`).locator('..')
  await blogDiv.getByRole('button', { name: 'view' }).click()
  const likeButton = await blogDiv.getByRole('button', { name: 'like' })

  for (let i = 0; i < likes; i++) {
    await likeButton.click()
    await blogDiv.getByText(`likes ${i + 1}`).waitFor()
  }
}

export { loginWith, createBlog, createBlogWithLikes }
