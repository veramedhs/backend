export const validateApplicationRules = () => {
  return [
    body('fullName')
      .trim()
      .notEmpty()
      .withMessage('Full name is required.')
      .isLength({ max: 100 })
      .withMessage('Full name cannot exceed 100 characters.'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address.')
      .normalizeEmail(),
    body('phoneNumber')
      .trim()
      .notEmpty()
      .withMessage('Contact number is required.'),
    body('position')
      .isIn(['backend-dev', 'frontend-dev', 'fullstack-dev', 'devops', 'qa'])
      .withMessage('Please select a valid position.'),
    body('coverLetter')
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Cover letter cannot exceed 2000 characters.')
      .optional(),
  ];
};