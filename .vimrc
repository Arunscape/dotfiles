" Make backspace behave in a sane manner.
set backspace=indent,eol,start

" Switch syntax highlighting on
syntax on

set number
set colorcolumn=80
" Enable file type detection and do language-dependent indenting.
filetype plugin indent on

" install vim-plug
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin('~/.vim/plugged')
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'thaerkh/vim-indentguides'
Plug 'ap/vim-css-color'
Plug 'chriskempson/base16-vim'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
call plug#end()

if filereadable(expand("~/.vimrc_background"))
  let base16colorspace=256
  source ~/.vimrc_background
endif

"ctags
map <C-\> :tab split<CR>:exec("tag ".expand("<cword>"))<CR>
map <A-]> :vsp <CR>:exec("tag ".expand("<cword>"))<CR>

set tabstop=2 shiftwidth=2 expandtab

"highlight Conceal guibg=NONE
"highlight Normal guibg=NONE ctermbg=NONE
"highlight SignColumn guibg=NONE ctermbg=NONE
highlight clear SignColumn
highlight clear LineNr
highlight Pmenu ctermbg=238 gui=bold


source ~/.vim/coc.vim

setlocal spell
set spelllang=en_ca
