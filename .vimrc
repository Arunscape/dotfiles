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
call plug#end()

"colorscheme badwolf

map <C-\> :tab split<CR>:exec("tag ".expand("<cword>"))<CR>

