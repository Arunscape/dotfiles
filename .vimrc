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
Plug 'lervag/vimtex'
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'nathanaelkane/vim-indent-guides'
Plug 'ludovicchabant/vim-gutentags'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'rhysd/vim-grammarous'
Plug 'neomake/neomake'
Plug 'thaerkh/vim-indentguides'
Plug 'ap/vim-css-color'
Plug 'chriskempson/base16-vim'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
call plug#end()

colorscheme base16-chalk
let g:airline_theme='base16-chalk'
let g:gruvbox_italic=1
set termguicolors

let g:vimtex_compiler_progname = 'nvr'
let g:tex_flavor='latex'
autocmd Filetype tex,latex setlocal sw=2
autocmd bufreadpre *.tex setlocal textwidth=80

"ctags
map <C-\> :tab split<CR>:exec("tag ".expand("<cword>"))<CR>
map <A-]> :vsp <CR>:exec("tag ".expand("<cword>"))<CR>

set tabstop=2 shiftwidth=2 expandtab

call neomake#configure#automake('nrwi', 500)


let g:vimtex_compiler_latexmk = {
    \ 'options' : [
    \   '-pdf',
    \   '-shell-escape',
    \   '-verbose',
    \   '-file-line-error',
    \   '-synctex=1',
    \   '-interaction=nonstopmode',
    \ ],
    \}
let g:vimtex_view_general_viewer = 'zathura'
hi Conceal guibg=NONE guifg=White

highlight Normal guibg=NONE ctermbg=NONE
highlight SignColumn guibg=NONE ctermbg=NONE

source ~/.vim/coc.vim

setlocal spell
set spelllang=en_ca
inoremap <C-l> <c-g>u<Esc>[s1z=`]a<c-g>u
