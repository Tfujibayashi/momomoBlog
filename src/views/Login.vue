<template>
    <div id="login">
        <form name='form-login' @submit.prevent="exec">
            <input type="text" id="user" placeholder="ユーザー名" v-model="mailaddress">
            <input type="password" id="pass" placeholder="パスワード" v-model="password">
            <button value="Login" @click="login">Login</button>
        </form>
    </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

export default {
    name: 'Login',
      methods: {
        login: function () {
            firebase.auth().signInWithEmailAndPassword(this.mailaddress, this.password)
                .then((user) => {
                    this.$store.commit('updateFlag', user.user.uid);
                    this.$router.push('admin');
                })
                .catch(() => {
                    alert("ログインに失敗しました");
                })
        }
    }
}
</script>

<style scoped lang="scss">

#login {
  margin: 50px auto;
  width: 50%;

  form {
    margin: auto;
    padding: 50px;
    width: 480px;
    border-radius: 5px;
    background: #282e33;
    border-top: 3px solid #434a52;
    border-bottom: 3px solid #434a52;

    input, button {
        color: #a9a9a9;
        font-size: 1.6rem;
    }

    input[type="text"] {
        background-color: white;
        border-radius: 0px 3px 3px 0px;
        margin-bottom: 1em;
        padding: 0 16px;
        width: 100%;
        height: 50px;
    }

    input[type="password"] {
        background-color: white;
        border-radius: 0px 3px 3px 0px;
        margin-bottom: 1em;
        padding: 0 16px;
        width: 100%;
        height: 50px;
    }

    button {
        background-color: #b5cd60;
        border: 0;
        width: 100%;
        height: 40px;
        border-radius: 3px;
        color: white;
        cursor: pointer;
        transition:  background-color 0.3s ease-in-out;
    }

    button:hover {
        background: #16aa56;
    }
  }
}
</style>