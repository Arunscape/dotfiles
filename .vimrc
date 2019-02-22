" This must be first, because it changes other options as a side effect.
set nocompatible

" Make backspace behave in a sane manner.
set backspace=indent,eol,start

" Switch syntax highlighting on
syntax on

" Enable file type detection and do language-dependent indenting.
filetype plugin indent on

" auto refresh for latex live preview
autocmd Filetype tex setl updatetime=5

" install vim-plug
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin('~/.vim/plugged')
"Plug 'xuhdev/vim-latex-live-preview', { 'for': 'tex' }
Plug 'lervag/vimtex'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'itchyny/lightline.vim'
Plug 'terryma/vim-multiple-cursors'
Plug 'tpope/vim-eunuch'
Plug 'tpope/vim-surround'
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'editorconfig/editorconfig-vim'
Plug 'mattn/emmet-vim'
Plug 'w0rp/ale'
Plug 'airblade/vim-gitgutter'
Plug 'janko-m/vim-test'
Plug 'sjl/badwolf'
Plug 'nathanaelkane/vim-indent-guides'
Plug 'romgrk/winteract.vim'
Plug 'Valloric/YouCompleteMe', { 'do': './install.py' }
Plug 'ludovicchabant/vim-gutentags'
Plug 'rust-lang/rust.vim'
Plug 'posva/vim-vue'

" post install (yarn install | npm install) then load plugin only for editing supported files
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install',
  \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue', 'yaml', 'html'] }
call plug#end()

colorscheme badwolf


let g:prettier#exec_cmd_async = 1
let g:prettier#autoformat = 0
let g:rustfmt_autosave = 1
autocmd BufWritePre *.js,*.jsx,*.mjs,*.ts,*.tsx,*.css,*.less,*.scss,*.json,*.graphql,*.md,*.vue,*.yaml,*.html PrettierAsync


map <C-\> :tab split<CR>:exec("tag ".expand("<cword>"))<CR>


" BEGIN PRETTIER DEFAULTS
" max line length that prettier will wrap on
" Prettier default: 80
"let g:prettier#config#print_width = 80
"
" number of spaces per indentation level
" Prettier default: 2
"let g:prettier#config#tab_width = 2
"
" use tabs over spaces
" Prettier default: false
"let g:prettier#config#use_tabs = 'false'
"
" print semicolons
" Prettier default: true
"let g:prettier#config#semi = 'true'
"
" single quotes over double quotes
" Prettier default: false
"let g:prettier#config#single_quote = 'true'
let g:prettier#config#single_quote = 'false'

" print spaces between brackets
" Prettier default: true
"let g:prettier#config#bracket_spacing = 'false'
let g:prettier#config#bracket_spacing = 'true'

" put > on the last line instead of new line
" Prettier default: false
"let g:prettier#config#jsx_bracket_same_line = 'true'
let g:prettier#config#jsx_bracket_same_line = 'false'

" avoid|always
" Prettier default: avoid
"let g:prettier#config#arrow_parens = 'always'
let g:prettier#config#arrow_parens = 'avoid'

" none|es5|all
" Prettier default: none
"let g:prettier#config#trailing_comma = 'all'
let g:prettier#config#trailing_comma = 'none'

" flow|babylon|typescript|css|less|scss|json|graphql|markdown
" Prettier default: babylon
"let g:prettier#config#parser = 'flow'
let g:prettier#config#parser = 'babylon'

" cli-override|file-override|prefer-file
let g:prettier#config#config_precedence = 'prefer-file'

" always|never|preserve
let g:prettier#config#prose_wrap = 'preserve'

" css|strict|ignore
let g:prettier#config#html_whitespace_sensitivity = 'css'
" END PRETTIER DEFAULTS
