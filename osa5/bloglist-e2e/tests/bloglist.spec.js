const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createBlogWithLikes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'salainen',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
      await expect(page.getByText('Superuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'kalainen')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
      await expect(page.getByText('Superuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')
      await expect(page.getByText('testTitle testAuthor')).toBeVisible()
      await expect(
        page.getByText('a new blog testTitle by testAuthor added')
      ).toBeVisible()
    })

    describe('With one blog expanded', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')
        await page.getByTestId('blogDetailsButton').click()
      })

      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByTestId('blogLikes')).toContainText('likes 1')
      })

      test('blog can be removed by creator', async ({ page }) => {
        page.on('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('testTitle testAuthor')).not.toBeVisible()
      })

      test('blog remove button is not visible to other user', async ({
        page,
        request,
      }) => {
        await request.post('/api/users', {
          data: {
            name: 'Otheruser',
            username: 'other',
            password: 'salainen',
          },
        })

        await page.getByRole('button', { name: 'log out' }).click()
        await loginWith(page, 'other', 'salainen')
        await page.getByTestId('blogDetailsButton').click()
        await expect(
          page.getByRole('button', { name: 'remove' })
        ).not.toBeVisible()
      })
    })

    test('four blogs are correctly ordered by likes', async ({ page }) => {
      await createBlogWithLikes(page, 'threeLikes', 'author1', 'url1', 3)
      await createBlogWithLikes(page, 'nineLikes', 'author1', 'url1', 9)
      await createBlogWithLikes(page, 'zeroLikes', 'author1', 'url1', 0)
      await createBlogWithLikes(page, 'elevenLikes', 'author1', 'url1', 11)
      await expect(page.getByTestId('blog').first()).toContainText(
        'elevenLikes'
      )
      await expect(page.getByTestId('blog').nth(1)).toContainText('nineLikes')
      await expect(page.getByTestId('blog').nth(2)).toContainText('threeLikes')
      await expect(page.getByTestId('blog').nth(3)).toContainText('zeroLikes')
    })
  })
})
