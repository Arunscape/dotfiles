" This must be first, because it changes other options as a side effect.
set nocompatible

" Make backspace behave in a sane manner.
set backspace=indent,eol,start

" Switch syntax highlighting on
syntax on

set number
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
"Plug 'lervag/vimtex'
"Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
"Plug 'junegunn/fzf.vim'
"Plug 'itchyny/lightline.vim'
"Plug 'terryma/vim-multiple-cursors'
"Plug 'tpope/vim-eunuch'
"Plug 'tpope/vim-surround'
"Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
"Plug 'editorconfig/editorconfig-vim'
"Plug 'mattn/emmet-vim'
"Plug 'w0rp/ale'
"Plug 'airblade/vim-gitgutter'
"Plug 'janko-m/vim-test'
"Plug 'sjl/badwolf'
"Plug 'nathanaelkane/vim-indent-guides'
"Plug 'romgrk/winteract.vim'
"Plug 'Valloric/YouCompleteMe', { 'do': './install.py' }
"Plug 'ludovicchabant/vim-gutentags'
"Plug 'rust-lang/rust.vim'
Plug 'vim-latex/vim-latex'
Plug 'morhetz/gruvbox'
call plug#end()

"colorscheme badwolf
colorscheme gruvbox
set background=dark

map <C-\> :tab split<CR>:exec("tag ".expand("<cword>"))<CR>

" REQUIRED. This makes vim invoke Latex-Suite when you open a tex file.
filetype plugin on

" IMPORTANT: win32 users will need to have 'shellslash' set so that latex
" can be called correctly.
set shellslash

" OPTIONAL: This enables automatic indentation as you type.
filetype indent on

" OPTIONAL: Starting with Vim 7, the filetype of empty .tex files defaults to
" 'plaintex' instead of 'tex', which results in vim-latex not being loaded.
" The following changes the default filetype back to 'tex':
let g:tex_flavor='latex'

" General colors
if has('gui_running') || has('nvim')
    hi Normal 		guifg=#f6f3e8 guibg=#242424
else
    " Set the terminal default background and foreground colors, thereby
    " improving performance by not needing to set these colors on empty cells.
    hi Normal guifg=NONE guibg=NONE ctermfg=NONE ctermbg=NONE
    let &t_ti = &t_ti . "\033]10;#f6f3e8\007\033]11;#242424\007"
    let &t_te = &t_te . "\033]110\007\033]111\007"
endif
