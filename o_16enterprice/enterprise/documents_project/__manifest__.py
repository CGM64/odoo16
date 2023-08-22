# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Documents - Projects',
    'version': '1.0',
    'category': 'Productivity/Documents',
    'summary': 'Project from documents',
    'description': """
Add the ability to create invoices from the document module.
""",
    'website': ' ',
    'depends': ['documents', 'project'],
    'data': [
        'data/documents_project_data.xml',
        'views/documents_views.xml',
        'views/project_views.xml',
        'views/templates.xml',
    ],
    'auto_install': True,
    'license': 'OEEL-1',
    'post_init_hook': '_documents_project_post_init',
}
